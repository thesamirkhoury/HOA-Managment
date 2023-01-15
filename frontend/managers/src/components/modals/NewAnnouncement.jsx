import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewAnnouncement() {
  const { newAnnouncement, dispatch } = useModalsContext();
  const placeholderBuildingsCount = 3;

  return (
    <Modal
      show={newAnnouncement}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_ANNOUNCEMENT", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרסום הודעה חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>כותרת ההודעה</Form.Label>
            <Form.Control required type="text" placeholder=""></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>תוכן התזכורת</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              required
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>מספר בניין</Form.Label>
            <Form.Select
              aria-label="Supplier type select"
              onChange={(e) => {
                // console.log(e.target.value);
              }}
            >
              <option>בחר בניין</option>
              <option value="0">כל הבנינים - כללי</option>
              {/* <option value="valueID">OptionName> </option> */}
              {[...Array(placeholderBuildingsCount)].map((_, id) => (
                <option value={id + 1}>{id + 1}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>פרסום הודעה
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_ANNOUNCEMENT", payload: false });
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

export default NewAnnouncement;
