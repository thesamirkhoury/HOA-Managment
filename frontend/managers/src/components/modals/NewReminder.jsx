import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewReminder() {
  const { newReminder, dispatch: showModal } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    showModal({ type: "NEW_REMINDER", payload: false });
    //reset the input fields
    setTitle("");
    setBody("");
    setDateAndTime("");
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const reminder = {
      title,
      body,
      dateAndTime,
    };

    const errors = await sendData(
      "reminders",
      "POST",
      reminder,
      "NEW_REMINDER"
    );
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal
      show={newReminder}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת תזכורת חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>כותרת התזכורת</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תוכן התזכורת</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              type="text"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תאריך וזמן התזכורת</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              dir="ltr"
              value={dateAndTime}
              onChange={(e) => {
                setDateAndTime(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>הוספת תזכורת
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

export default NewReminder;
