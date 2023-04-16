import React from "react";
import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BillingDetails({ details }) {
  const { billingDetails, dispatch } = useModalsContext();

  return (
    <Modal
      show={billingDetails}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "BILLING_DETAILS", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי הפנייה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {details && (
          <Form>
            <Row>
              <Form.Group as={Col} md="5">
                <Form.Label>סכום נדרש</Form.Label>
                <Form.Control
                  disabled
                  defaultValue={details.amount}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="5">
                <Form.Label>סוג התשלום</Form.Label>
                <Form.Control
                  disabled
                  defaultValue={details.paymentType}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="1">
                <Form.Label>סטטוס</Form.Label>
                <Badge
                  bg={details.paymentStatus === "שולם" ? "success" : "danger"}
                  className="fs-6"
                >
                  {details.paymentStatus}
                </Badge>
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Label>תיאור דרישת התשלום</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                disabled
                defaultValue={details.description}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>תאריך הנפקה</Form.Label>
                <Form.Control
                  disabled
                  type="date"
                  dir="ltr"
                  defaultValue={details.createdAt.split("T")[0]}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>לתשלום עד</Form.Label>
                <Form.Control
                  disabled
                  type="date"
                  dir="ltr"
                  defaultValue={details.dueDate.split("T")[0]}
                ></Form.Control>
              </Form.Group>
            </Row>

            <div className="mt-5 float-end">
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => {
                  dispatch({ type: "BILLING_DETAILS", payload: false });
                }}
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

export default BillingDetails;
