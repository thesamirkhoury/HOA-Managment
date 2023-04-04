import React from "react";
import { useModalsContext } from "../../hooks/useModalsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//Data Context hooks
import { useTenantsContext } from "../../hooks/useTenantsContext";
import { useSuppliersContext } from "../../hooks/useSuppliersContext";
import { useRemindersContext } from "../../hooks/useRemindersContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteConfirmation({ deleteData }) {
  const { deleteConfirmation, dispatch: showModal } = useModalsContext();
  const { user } = useAuthContext();
  //Data Context
  const { dispatch: dispatchTenants } = useTenantsContext();
  const { dispatch: dispatchSuppliers } = useSuppliersContext();
  const { dispatch: dispatchReminders } = useRemindersContext();

  async function deleteItem(suffix) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/${suffix}/${deleteData.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      showModal({ type: "DELETE_CONFIRMATION", payload: false });
      return json;
    }
    if (!response.ok) {
      return null;
    }
  }

  async function handleDelete() {
    switch (deleteData.page) {
      case "TENANTS":
        let tenant = await deleteItem("tenants");
        if (tenant) {
          dispatchTenants({ type: "DELETE_TENANT", payload: tenant });
        }
        break;

      case "SUPPLIERS":
        let supplier = await deleteItem("suppliers");
        if (supplier) {
          dispatchSuppliers({ type: "DELETE_SUPPLIER", payload: supplier });
        }
        break;

      case "REMINDERS":
        let reminder = await deleteItem("reminders");
        if (reminder) {
          dispatchReminders({ type: "DELETE_REMINDER", payload: reminder });
        }
        break;

      default:
        showModal({ type: "DELETE_CONFIRMATION", payload: false });
    }
  }

  return (
    <Modal
      show={deleteConfirmation}
      onHide={() => {
        showModal({ type: "DELETE_CONFIRMATION", payload: false });
      }}
    >
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <i className="bi bi-x-circle text-danger display-1 mb-1"></i>
          <h2>{`למחוק את ${deleteData ? deleteData.displayName : ""}?`}</h2>
          <h5 className="text-muted">
            שים לב שהפיעולה הזאת הינה סופית ולא ניתנת לשינוי
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center mb-4">
        <Button variant="danger" onClick={handleDelete}>
          <i className="bi bi-trash3"></i> מחק
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-2"
          onClick={() => {
            showModal({ type: "DELETE_CONFIRMATION", payload: false });
          }}
        >
          <i className="bi bi-x-square"> </i> בטל
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
