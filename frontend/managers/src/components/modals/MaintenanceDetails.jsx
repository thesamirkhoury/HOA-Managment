import React from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";
//helper functions
import format from "date-fns/format";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MaintenanceManagement({ requestData }) {
  const { maintenanceDetails, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();

  async function handleChangeStatus(newStatus) {
    const status = {
      status: newStatus,
    };
    const errors = await sendData(
      `maintenance/${requestData._id}/status`,
      "PATCH",
      status,
      "MAINTENANCE_STATUS"
    );
    if (!errors) {
      dispatch({ type: "MAINTENANCE_DETAILS", payload: false });
    }
  }

  return (
    <Modal
      show={maintenanceDetails}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "MAINTENANCE_DETAILS", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי קריאת השירות</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Tenant Details */}
        {requestData && (
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
                        defaultValue={`${requestData.firstName} ${requestData.lastName}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>מספר בניין</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={requestData.buildingNumber}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>מספר דירה</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={requestData.apartmentNumber}
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
                        defaultValue={requestData.phoneNumber}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group>
                      <Form.Label>מייל</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={requestData.tenantEmail}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Request Details */}
        {requestData && (
          <Card className="mt-2">
            <Card.Header className="fs-4">פרטי קריאת השירות</Card.Header>
            {/* Card Body */}
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>נושא קריאת השירות</Form.Label>
                  <Form.Control
                    disabled
                    defaultValue={`${requestData.subject}`}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>תוכן קריאת השירות</Form.Label>
                  <Form.Control
                    disabled
                    as="textarea"
                    rows={4}
                    defaultValue={`${requestData.description}`}
                  ></Form.Control>
                </Form.Group>

                {/* Show the view image button only if the status is not closed */}
                {requestData.status !== "סגור" && (
                  <Button
                    variant="outline-primary"
                    className={"mt-2 col-12"}
                    onClick={() => {
                      dispatch({
                        type: "MAINTENANCE_IMAGES",
                        payload: true,
                      });
                      dispatch({ type: "MAINTENANCE_DETAILS", payload: false });
                    }}
                  >
                    הצג תיעוד הקריאה
                  </Button>
                )}

                <Row className="mt-2">
                  {/* Show the status badge only if the status is not closed */}
                  {requestData.status !== "סגור" && (
                    <Col md="6">
                      <p className="mt-1">
                        הסטטוס:
                        <Badge
                          bg={
                            requestData.status === "פתוח" ? "danger" : "warning"
                          }
                          className="fs-6 ms-1"
                        >
                          {requestData.status}
                        </Badge>
                      </p>
                    </Col>
                  )}

                  <Col md="6">
                    <p>
                      תאריך הפתיחה:
                      <span>
                        {format(
                          new Date(requestData.createdAt),
                          "HH:mm dd/MM/yyyy"
                        )}
                      </span>
                    </p>
                  </Col>

                  {/* Show the closed at date only whe the status is closed */}
                  {requestData.status === "סגור" && (
                    <Col md="6">
                      <p>
                        תאריך סגירה:
                        <span>
                          {format(
                            new Date(requestData.updatedAt),
                            "HH:mm dd/MM/yyyy"
                          )}
                        </span>
                      </p>
                    </Col>
                  )}
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Buttons */}
        {/* Hide the control buttons if the status is closed */}
        {requestData && (
          <>
            {requestData.status !== "סגור" && (
              <div className="mt-3 float-end">
                <ButtonGroup className="me-1">
                  <DropdownButton
                    title="שנה סטטוס"
                    onSelect={(e) => {
                      handleChangeStatus(e);
                    }}
                  >
                    <Dropdown.Item eventKey="בטיפול">בטיפול</Dropdown.Item>
                    <Dropdown.Item eventKey="סגור">סגור</Dropdown.Item>
                  </DropdownButton>
                </ButtonGroup>

                <Button
                  variant="success"
                  type="submit"
                  onClick={() => {
                    dispatch({ type: "FORWARD_MAINTENANCE", payload: true });

                    dispatch({ type: "MAINTENANCE_DETAILS", payload: false });
                  }}
                >
                  <i className="bi bi-envelope"> </i>העבר לספק
                </Button>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MaintenanceManagement;
