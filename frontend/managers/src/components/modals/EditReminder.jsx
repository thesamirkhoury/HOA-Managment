import React, { useState, useEffect } from "react";

//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";
import format from "date-fns/format";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditReminder({ editData }) {
  const { editReminder, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();

  // form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  //error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setBody(editData.body);
      setDateAndTime(
        // get the date formatted for local timezone
        format(new Date(editData.dateAndTime), "yyyy-MM-dd'T'HH:mm")
      );
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_REMINDER", payload: false });
    setTitle(editData.title);
    setBody(editData.body);
    setDateAndTime(editData.dateAndTime.split(".")[0]);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();

    const reminder = {
      title,
      body,
      dateAndTime,
    };

    const errors = await sendData(
      `reminders/${editData._id}`,
      "PATCH",
      reminder,
      "EDIT_REMINDER"
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
      show={editReminder}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון תזכורת</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editData && (
          <Form onSubmit={handleEdit}>
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
                <i className="bi bi-pen"> </i>עדכון תזכורת
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
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EditReminder;
