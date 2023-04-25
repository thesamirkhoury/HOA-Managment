import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewMaintenance() {
  const { newMaintenance, dispatch } = useModalsContext();
  const { sendFormData } = useDataHandler();
  //form state
  const [image, setImage] = useState({});
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "NEW_MAINTENANCE", payload: false });
    setImage({});
    setSubject("");
    setDescription("");
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //form data body
    let formData = new FormData();
    formData.append("file", image);
    formData.append("subject", subject);
    formData.append("description", description);
    //upload file
    const errors = await sendFormData(
      "maintenance",
      "POST",
      formData,
      "NEW_MAINTENANCE"
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
      show={newMaintenance}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>קריאת שירות חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>נושא הקריאה</Form.Label>
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
            <Form.Label>תוכן הקריאה</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={5}
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>צילום ותיעוד</Form.Label>
            <Form.Control
              type="file"
              accept=".png,.jpeg"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <div className="mt-5 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-send"> </i>שלח הקריאה
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

export default NewMaintenance;
