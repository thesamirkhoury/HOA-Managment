import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteConfirmation({ deleteData }) {
  const { deleteConfirmation, dispatch } = useModalsContext();
  return (
    <Modal
      show={deleteConfirmation}
      onHide={() => {
        dispatch({ type: "DELETE_CONFIRMATION", payload: false });
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
        <Button variant="danger" onClick={() => {}}>
          <i className="bi bi-trash3"></i> מחק
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-2"
          onClick={() => {
            dispatch({ type: "DELETE_CONFIRMATION", payload: false });
          }}
        >
          <i className="bi bi-x-square"> </i> בטל
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
