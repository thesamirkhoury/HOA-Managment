import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditPassword() {
  const { editPassword, dispatch } = useModalsContext();

  return (
    <Modal
      show={editPassword}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "EDIT_PASSWORD", payload: false });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>החלפת סיסמה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>סיסמה נוחכית</Form.Label>
            <Form.Control required type="password" placeholder="סיסמה נוחכית" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>סיסמה חדשה</Form.Label>
            <Form.Control required type="password" placeholder="סיסמה חדשה" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>אימות סיסמה חדשה</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="אימות סיסמה חדשה"
            />
          </Form.Group>

          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-check-lg"> </i>עדכן סיסמה
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "EDIT_PASSWORD", payload: false });
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

export default EditPassword;
