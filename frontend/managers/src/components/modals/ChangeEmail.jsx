import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ChangeEmail() {
  const { changeEmail, dispatch } = useModalsContext();

  return (
    <Modal
      show={changeEmail}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "CHANGE_EMAIL", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>החלפת מייל</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>מייל קיים</Form.Label>
            <Form.Control
              defaultValue="israelisraeli@gmail.com"
              type="email"
              readOnly
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-1">
            <Form.Label>מייל חדש</Form.Label>
            <Form.Control type="email" required></Form.Control>
          </Form.Group>

          <Form.Group className="mt-1">
            <Form.Label>אימות מייל חדש</Form.Label>
            <Form.Control type="email" required></Form.Control>
          </Form.Group>

          <div className="mt-5 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-check-lg"> </i>עדכן מייל
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "INQUIRY_DETAILS", payload: false });
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

export default ChangeEmail;
