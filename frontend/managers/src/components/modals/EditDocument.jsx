import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditDocument() {
  const { editDocument, dispatch } = useModalsContext();

  return (
    <Modal
      show={editDocument}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "EDIT_DOCUMENT", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>העלאת קובץ חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>שם הקובץ</Form.Label>
            <Form.Control required type="text" value=""></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תיאור הקובץ</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              value=""
            ></Form.Control>
          </Form.Group>

          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-pen"> </i>עדכן פרטי הקובץ
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "EDIT_DOCUMENT", payload: false });
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

export default EditDocument;
