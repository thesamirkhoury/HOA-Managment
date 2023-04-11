import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewInquiry() {
  const { newInquiry, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  //form state
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "NEW_INQUIRY", payload: false });
    setSubject("");
    setBody("");
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const inquiry = { subject, body };
    const errors = await sendData("inquiries", "POST", inquiry, "NEW_INQUIRY");
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal show={newInquiry} fullscreen="lg-down" size="lg" onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>פניה חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>נושא הפנייה</Form.Label>
            <Form.Control
              required
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תוכן הפנייה</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              required
              type="text"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <div className="mt-5 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-send"> </i>שלח הפנייה
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={handleHide}
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
