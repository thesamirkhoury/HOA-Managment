import React from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CloseAccount() {
  const { closeAccount, dispatch } = useModalsContext();

  return (
    <Modal
      show={closeAccount}
      onHide={() => {
        dispatch({ type: "CLOSE_ACCOUNT", payload: false });
      }}
    >
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <i className="bi bi-x-octagon-fill text-danger display-1 mb-1"></i>
          <h2>האם ברצנוך לסגור את החשבון?</h2>
          <h5 className="text-muted">
            סגירת חשבון הועד תגרום לכל המידע להמחק לרבות מידע פיננסי וקבצים,
            והגישה לדיירים תחסם באופן מיידי.
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center mb-4">
        <Button variant="danger" className="w-50" >
          <i className="bi bi-x-lg"></i> סגירת החשבון
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-2 w-25"
          onClick={() => {
            dispatch({ type: "CLOSE_ACCOUNT", payload: false });
          }}
        >
          <i className="bi bi-x-square"> </i> ביטול
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CloseAccount;