import React, { useState, useEffect } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditTenant({ editData }) {
  const { editTenant, dispatch } = useModalsContext();

  const [isEditable, SetIsEditable] = useState(false);

  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (editData) {
      if (editData.tenantType === "בעל בית") {
        setIsOwner(true);
      }
      if (editData.tenantType === "שוכר") {
        setIsOwner(false);
      }
    }
  }, [editData]);

  return (
    <Modal
      show={editTenant}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "EDIT_TENANT", payload: false });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי הדייר</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>שם פרטי</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>שם משפחה</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
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
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>מספר דירה</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="numeric"
                min="1"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>מספר חניה</Form.Label>
              <Form.Control
                type="number"
                inputMode="numeric"
                min="1"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control
                required
                type="tel"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>מייל</Form.Label>
              <Form.Control
                required
                type="email"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
          </Row>

          <Row className="ms-2 mb-3">
            <Form.Check
              type="checkbox"
              label="הדייר הינו שוכר"
              id="isOwnerCheckBox"
              checked={!isOwner}
              disabled={!isEditable}
              onChange={() => {
                setIsOwner(!isOwner);
              }}
            />
          </Row>
          <Row className={`mb-3 ${isOwner ? "d-none" : ""}`}>
            <Form.Group as={Col} md="6">
              <Form.Label>שם פרטי של בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="text"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>שם משפחה של בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="text"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className={`${isOwner ? "d-none" : ""}`}>
            <Form.Group as={Col} md="6">
              <Form.Label>מספר טלפון של בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="tel"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>מייל בעל הדירה</Form.Label>
              <Form.Control
                required={!isOwner}
                type="email"
                defaultValue=""
                disabled={!isEditable}
              ></Form.Control>
            </Form.Group>
          </Row>

          {!isEditable && (
            <div className="mt-3 float-end">
              <Button
                variant="success"
                onClick={() => {
                  SetIsEditable(true);
                }}
              >
                <i className="bi bi-pen"> </i>עדכן פרטי דייר
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => {
                  dispatch({ type: "EDIT_TENANT", payload: false });
                }}
              >
                <i className="bi bi-x-square"> </i>סגור חלון
              </Button>
            </div>
          )}

          {/* Edit Confirmation */}
          {isEditable && (
            <div className="mt-3 float-end">
              <Button variant="outline-success" type="submit">
                עדכן פרטיים
              </Button>
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={() => {
                  SetIsEditable(false);
                }}
              >
                בטל
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTenant;
