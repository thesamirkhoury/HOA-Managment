import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";
//helper functions
import { range } from "../../util/range";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditAnnouncement({ editData, buildingsCount }) {
  const { editAnnouncement, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [buildingNumber, setBuildingNumber] = useState();
  //error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setBody(editData.body);
      setBuildingNumber(editData.buildingNumber);
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_ANNOUNCEMENT", payload: false });
    setTitle(editData.title);
    setBody(editData.body);
    setBuildingNumber(editData.buildingNumber);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();
    const announcement = {
      title,
      body,
      buildingNumber,
    };
    const errors = await sendData(
      `announcements/${editData._id}`,
      "PATCH",
      announcement,
      "EDIT_ANNOUNCEMENT"
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
      show={editAnnouncement}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון הודעה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
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
              <option value="0">כל הבנינים - כללי</option>
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
              <i className="bi bi-plus-square"> </i>עדכון הודעה
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

export default EditAnnouncement;
