import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditBill() {
  const { editBill, dispatch } = useModalsContext();

  return (
    <Modal
      show={editBill}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "EDIT_BILL", payload: false });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון דרישת תשלום</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>בחר דייר</Form.Label>
            <Form.Select
              aria-label="Tenant Name select"
              onChange={(e) => {
                // console.log(e.target.value);
              }}
            >
              <option>בחר שם דייר</option>
              {/* //! Place holder data for API Call */}
              <option value="ישראל ישראלי">ישראל ישראלי</option>
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>סכום נדרש</Form.Label>
              <Form.Control required type="tel" value={""}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>סוג התשלום</Form.Label>
              <Form.Select
                aria-label="Payment type select"
                onChange={(e) => {
                  // console.log(e.target.value);
                }}
              >
                <option>בחר סוג תשלום</option>
                <option value="חודשי">חודשי</option>
                <option value="חד פעמי">חד-פעמי</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>תיאור דרישת התשלום</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              value={""}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>לתשלום עד</Form.Label>
            <Form.Control
              required
              type="date"
              dir="ltr"
              value={""}
            ></Form.Control>
          </Form.Group>
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-pen"> </i>עדכן דרישת תשלום
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "EDIT_REMINDER", payload: false });
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

export default EditBill;
