import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";
//helper functions
import { range } from "../../util/range";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewAnnouncement({ buildingsCount }) {
  const { newAnnouncement, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [buildingNumber, setBuildingNumber] = useState();
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "NEW_ANNOUNCEMENT", payload: false });
    setTitle("");
    setBody("");
    setBuildingNumber("");
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const announcement = {
      title,
      body,
      buildingNumber,
    };
    const errors = await sendData(
      "announcements",
      "POST",
      announcement,
      "NEW_ANNOUNCEMENT"
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
      show={newAnnouncement}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרסום הודעה חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {buildingsCount && (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>כותרת ההודעה</Form.Label>
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
                rows={5}
                required
                type="text"
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>מספר בניין</Form.Label>
              <Form.Select
                required
                aria-label="Building Number selector"
                value={buildingNumber}
                onChange={(e) => {
                  setBuildingNumber(e.target.value);
                }}
              >
                <option value="">בחר בניין</option>
                <option value={0}>כל הבנינים - כללי</option>
                {/* Dynamically List All Available Buildings  */}
                {range(buildingsCount).map((_, number) => (
                  <option value={number + 1} key={number + 1}>
                    {`בניין ${number + 1}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {error && <div className="error">{error}</div>}
            <div className="mt-3 float-end">
              <Button variant="success" type="submit">
                <i className="bi bi-plus-square"> </i>פרסום הודעה
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

export default NewAnnouncement;
