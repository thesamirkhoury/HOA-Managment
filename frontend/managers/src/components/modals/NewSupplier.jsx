import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NewSupplier() {
  const { newSupplier, dispatch } = useModalsContext();

  return (
    <Modal
      show={newSupplier}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_SUPPLIER", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת ספק חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>שם ספק</Form.Label>
              <Form.Control required type="text" placeholder=""></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>תחום התמחות הספק</Form.Label>
              <Form.Control required type="text" placeholder=""></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>סוג ספק</Form.Label>
              <Form.Select
                aria-label="Supplier type select"
                onChange={(e) => {
                  // console.log(e.target.value);
                }}
              >
                <option>בחר סוג</option>
                <option value="חברה">חברה</option>
                <option value="ספק פרטי">ספק פרטי</option>
              </Form.Select>
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
          <Button variant="success" type="submit">
            <i className="bi bi-plus-square"> </i>הוספת ספק
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
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewSupplier;
