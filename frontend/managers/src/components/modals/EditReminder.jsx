import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditReminder() {
  const { editReminder, dispatch } = useModalsContext();

  return (
    <Modal
      show={editReminder}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "EDIT_REMINDER", payload: false });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון תזכורת</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>כותרת התזכורת</Form.Label>
            <Form.Control required type="text" value={""}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תוכן התזכורת</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              type="text"
              value={""}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תאריך וזמן התזכורת</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              dir="ltr"
              value={"2023-01-21T09:50"}
            ></Form.Control>
          </Form.Group>
          <div className="mt-2">
            <Button variant="success" type="submit">
              <i className="bi bi-pen"> </i>עדכן תזכורת
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "EDIT_REMINDER", payload: false });
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

export default EditReminder;
