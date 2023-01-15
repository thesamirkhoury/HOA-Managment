import React, { useState } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NewTenant() {
  const { newTenant, dispatch } = useModalsContext();
  const [isOwner, setIsOwner] = useState(true);

  return (
    <Modal
      show={newTenant}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_TENANT", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת דייר חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>שם פרטי</Form.Label>
              <Form.Control required type="text" placeholder=""></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>שם משפחה</Form.Label>
              <Form.Control required type="text" placeholder=""></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>מספר בניין</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="numeric"
                min="1"
                placeholder=""
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>מספר דיירה</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="numeric"
                min="1"
                placeholder=""
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>מספר חנייה</Form.Label>
              <Form.Control
                type="number"
                inputMode="numeric"
                min="1"
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control required type="tel" placeholder=""></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>מייל</Form.Label>
              <Form.Control required type="email" placeholder=""></Form.Control>
            </Form.Group>
          </Row>

          <Row className="ms-2 mb-3">
            <Form.Check
              type="checkbox"
              label="הדייר הינו שוכר"
              id="isOwnerCheckBox"
              checked={!isOwner}
              onChange={() => {
                setIsOwner(!isOwner);
              }}
            />
          </Row>
          <Row className={`mb-3 ${isOwner ? "d-none" : ""}`}>
            <Form.Group as={Col} md="6">
              <Form.Label>שם פרט של בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="text"
                placeholder=""
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>שם משפחה של בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="text"
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className={`${isOwner ? "d-none" : ""}`}>
            <Form.Group as={Col} md="6">
              <Form.Label>מספר טלפון של בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="tel"
                placeholder=""
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>מייל בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="email"
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </Row>
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>הוספת דייר
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_TENANT", payload: false });
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

export default NewTenant;
