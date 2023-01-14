import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NewReminder() {
  const { newReminder, dispatch } = useModalsContext();
  return (
    <Modal
      show={newReminder}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_REMINDER", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת תזכורת חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>כותרת התזכורת</Form.Label>
            <Form.Control required type="text" placeholder=""></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תוכן התזכורת</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תאריך וזמן התזכורת</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              dir="ltr"
              placeholder=""
            ></Form.Control>
          </Form.Group>
          <div className="mt-2">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>הוספת תזכורת
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_REMINDER", payload: false });
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

export default NewReminder;
