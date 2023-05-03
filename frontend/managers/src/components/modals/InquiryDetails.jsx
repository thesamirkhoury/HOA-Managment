import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InquiryDetails({ inquiryData }) {
  const { inquiryDetails, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  const [reply, setReply] = useState("");

  function handleHide() {
    dispatch({ type: "INQUIRY_DETAILS", payload: false });
    setReply("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = { response: reply };
    console.log(inquiryData);
    const errors = await sendData(
      `inquiries/${inquiryData._id}/response`,
      "POST",
      response,
      "INQUIRY_RESPONSE"
    );
    if (!errors) {
      handleHide();
    }
  }

  return (
    <Modal
      show={inquiryDetails}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי הפניה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Tenant Details */}
        {inquiryData && (
          <Card>
            <Card.Header className="fs-4">פרטי הדייר</Card.Header>
            {/* Card Body */}
            <Card.Body>
              <Form>
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>שם הדייר</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={`${inquiryData.firstName} ${inquiryData.lastName}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>מספר בניין</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={inquiryData.buildingNumber}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>מספר דירה</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={inquiryData.apartmentNumber}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Form.Group>
                      <Form.Label>מספר טלפון</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={inquiryData.phoneNumber}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group>
                      <Form.Label>מייל</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={inquiryData.tenantEmail}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Inquiry Details */}
        {inquiryData && (
          <Card className="mt-2">
            <Card.Header className="fs-4">פרטי הפניה</Card.Header>
            {/* Card Body */}
            <Card.Body>
              <Form.Group>
                <Form.Label>נושא הפניה</Form.Label>
                <Form.Control
                  disabled
                  defaultValue={`${inquiryData.subject}`}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>תוכן הפניה</Form.Label>
                <Form.Control
                  disabled
                  as="textarea"
                  rows={4}
                  defaultValue={`${inquiryData.body}`}
                ></Form.Control>
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        {/* Response */}
        {inquiryData && (
          <Card className="mt-2">
            <Card.Header className="fs-4">תשובה לפניה</Card.Header>
            {/* Card Body */}
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>תשובת הועד</Form.Label>
                  <Form.Control
                    disabled={inquiryData.status === "סגור"}
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    value={
                      inquiryData.status === "פתוח"
                        ? reply
                        : inquiryData.response
                    }
                    onChange={(e) => {
                      if (inquiryData.status === "פתוח") {
                        setReply(e.target.value);
                      }
                    }}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Buttons */}
        {inquiryData && (
          <div className="mt-3 float-end">
            {inquiryData.status === "פתוח" && (
              <Button variant="success" type="submit" onClick={handleSubmit}>
                <i className="bi bi-send"> </i>שלח תשובה
              </Button>
            )}
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={handleHide}
            >
              <i className="bi bi-x-square"> </i>סגור חלון
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default InquiryDetails;
