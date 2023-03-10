import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewDocument() {
  const { newDocument, dispatch } = useModalsContext();

  return (
    <Modal
      show={newDocument}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_DOCUMENT", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>העלאת קובץ חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>שם הקובץ</Form.Label>
            <Form.Control required type="text" placeholder=""></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תיאור הקובץ</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>העלאת הקובץ</Form.Label>
            <Form.Control type="file" required />
          </Form.Group>

          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>העלאת הקובץ
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_DOCUMENT", payload: false });
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

export default NewDocument;
