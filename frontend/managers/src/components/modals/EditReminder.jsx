import React, { useState, useEffect } from "react";

//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useRemindersContext } from "../../hooks/useRemindersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditReminder({ editData }) {
  const { editReminder, dispatch: showModal } = useModalsContext();
  const { dispatch } = useRemindersContext();
  const { user } = useAuthContext();
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
      setDateAndTime(editData.dateAndTime.split(".")[0]);
    }
  }, [editData]);

  function handleHide() {
    showModal({ type: "EDIT_REMINDER", payload: false });
    setTitle(editData.title);
    setBody(editData.body);
    setDateAndTime(editData.dateAndTime.split(".")[0]);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const reminder = {
      title,
      body,
      dateAndTime,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/reminders/${editData._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(reminder),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //hide the modal
      handleHide();
      //add the data to the context
      dispatch({ type: "EDIT_REMINDER", payload: json });
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
            <div className="mt-3 float-end">
              <Button variant="success" type="submit">
                <i className="bi bi-pen"> </i>עדכן תזכורת
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
