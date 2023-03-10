import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditHOADetails() {
  const { editHOA, dispatch } = useModalsContext();

  return (
    <Modal
      show={editHOA}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "EDIT_HOA", payload: false });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון פרטי הועד</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>כתובת הבניין</Form.Label>
            <Form.Control required type="text" placeholder="" />
          </Form.Group>

          <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>שם פרטי</Form.Label>
                <Form.Control required type="text" placeholder="" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>שם משפחה</Form.Label>
                <Form.Control required type="text" placeholder="" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>מספר בניינים</Form.Label>
                <Form.Control
                  required
                  type="number"
                  inputMode="numeric"
                  min="1"
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>דמי הועד החודשיים</Form.Label>
                <Form.Control
                  required
                  type="number"
                  inputMode="decimal"
                  min="1"
                  step="any"
                  placeholder=""
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-check-lg"> </i>עדכן פרטים
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "EDIT_HOA", payload: false });
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

export default EditHOADetails;
