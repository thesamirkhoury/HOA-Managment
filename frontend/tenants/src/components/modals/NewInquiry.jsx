import React from "react";

import { useModalsContext } from "../../hook/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewInquiry() {
  const { newInquiry, dispatch } = useModalsContext();

  return (
    <Modal
      show={newInquiry}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_INQUIRY", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פניה חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>נושא הפנייה</Form.Label>
            <Form.Control required type="text" placeholder=""></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תוכן הפנייה</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              required
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>

          <div className="mt-5 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-send"> </i>שלח הפנייה
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_INQUIRY", payload: false });
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

export default NewInquiry;
