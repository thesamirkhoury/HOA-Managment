import React from "react";
import { useModalsContext } from "../../hooks/useModalsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//Data Context
import { useTenantsContext } from "../../hooks/useTenantsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteConfirmation({ deleteData }) {
  const { deleteConfirmation, dispatch: showModal } = useModalsContext();
  const { user } = useAuthContext();
  //Data Context
  const { dispatch: dispatchTenants } = useTenantsContext();

  async function deleteItem(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    if (!response.ok) {
      return null;
    }
  }
  
  async function handleDelete() {
    switch (deleteData.page) {
      case "TENANTS":
        let response = await deleteItem(
          `${process.env.REACT_APP_API_URL}/managers/tenants/${deleteData.id}`
        );
        if (response) {
          dispatchTenants({ type: "DELETE_TENANT", payload: response });
        }
        showModal({ type: "DELETE_CONFIRMATION", payload: false });
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
