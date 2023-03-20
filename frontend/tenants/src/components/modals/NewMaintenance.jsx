import React from "react";

import { useModalsContext } from "../../hook/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewMaintenance() {
  const { newMaintenance, dispatch } = useModalsContext();

  return (
    <Modal
      show={newMaintenance}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_MAINTENANCE", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>קריאת שירות חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>נושא הקריאה</Form.Label>
            <Form.Control required type="text" placeholder=""></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תוכן הקריאה</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              required
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>צילום ותיעוד</Form.Label>
            <Form.Control type="file" accept=".png,.jpeg" />
          </Form.Group>

          <div className="mt-5 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-send"> </i>שלח הקריאה
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_MAINTENANCE", payload: false });
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

export default NewMaintenance;
