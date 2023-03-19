import React from "react";

import { useModalsContext } from "../../hook/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function InquiryDetails() {
  const { inquiryDetails, dispatch } = useModalsContext();

  return (
    <Modal
      show={inquiryDetails}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "INQUIRY_DETAILS", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי הפנייה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>נושא הפנייה</Form.Label>
            <Form.Control
              defaultValue="החלפת נורות במעלית"
              readOnly
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תוכן הפנייה</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue="החלפת נורות במעלית"
              readOnly
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תשובת הועד</Form.Label>
            <Form.Control
              as="textarea"
              //    rows={} //rows = based on text len
              defaultValue="טופל בנורות במעלית"
              readOnly
              disabled
            ></Form.Control>
          </Form.Group>

          <div className="mt-5 float-end">
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

export default InquiryDetails;
