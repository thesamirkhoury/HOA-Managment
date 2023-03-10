import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditPersonalDetails() {
  const { editPersonal, dispatch } = useModalsContext();

  return (
    <Modal
      show={editPersonal}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "EDIT_PERSONAL", payload: false });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון פרטים אישיים</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>מייל</Form.Label>
            <Form.Control required type="email" placeholder=""></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>מספר טלפון</Form.Label>
            <Form.Control required type="tel" placeholder=""></Form.Control>
          </Form.Group>

          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-check-lg"> </i>עדכן פרטים
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "EDIT_PERSONAL", payload: false });
              }}
            >
              <i className="bi bi-x-square"> </i>סגור חלון
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditPersonalDetails;
