import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import ChangeEmail from "../components/modals/ChangeEmail";
import ChangePassword from "../components/modals/ChangePassword";

function Settings() {
  const { dispatch } = useModalsContext();
  const { details } = useDataContext();
  const { fetchData, sendData } = useDataHandler();
  //Edit toggle
  const [isEditable, SetIsEditable] = useState(false);
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  async function handleEdit(e) {
    e.preventDefault();
    const details = {
      firstName,
      lastName,
      phoneNumber,
    };
    const errors = await sendData("details", "PATCH", details, "SET_DETAILS");
    if (!errors) {
      SetIsEditable(false);
    }
    if (errors) {
      setError(errors.error);
    }
  }

  useEffect(() => {
    if (!details) {
      fetchData("details", "SET_DETAILS");
    }
    if (details) {
      setFirstName(details.firstName);
      setLastName(details.lastName);
      setPhoneNumber(details.phoneNumber);
      setEmail(details.tenantEmail);
    }
  }, [details]); //eslint-disable-line
  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - הגדרות</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">הגדרות</h1>

      {/* Details Card */}
      <Card>
        <Card.Header className="fs-3">פרטים אישיים</Card.Header>

        {/* Card Body */}
        <Card.Body>
          {details && (
            <Form className="m-2" onSubmit={handleEdit}>
              <Row>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fs-5">שם פרטי</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      disabled={!isEditable}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fs-5">שם משפחה</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      disabled={!isEditable}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label className="fs-5">סוג דייר</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={details.tenantType}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <hr />

              <Row>
                <Col md={details.parkingSpot ? 4 : 6}>
                  <Form.Group>
                    <Form.Label className="fs-5">מספר בניין</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={details.buildingNumber}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={details.parkingSpot ? 4 : 6}>
                  <Form.Group>
                    <Form.Label className="fs-5">מספר דיירה</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={details.apartmentNumber}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                {details.parkingSpot && (
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fs-5">מספר חנייה</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={details.parkingSpot}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                )}
              </Row>

              <hr />

              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fs-5">מספר טלפון</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      disabled={!isEditable}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fs-5">מייל</Form.Label>
                    <Form.Control
                      disabled
                      type="email"
                      defaultValue={email}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fs-5">שם המשתמש</Form.Label>
                    <Form.Control
                      disabled
                      type="email"
                      defaultValue={details.username}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <hr />
              {error && <div className="error">{error}</div>}
              {/* Edit data, Password & Email reset */}
              {!isEditable && (
                <Row className="mt-2">
                  <Col>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => {
                        SetIsEditable(true);
                      }}
                    >
                      עדכן פרטיים
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => {
                        dispatch({ type: "CHANGE_EMAIL", payload: true });
                      }}
                    >
                      החלפת מייל
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => {
                        dispatch({ type: "CHANGE_PASSWORD", payload: true });
                      }}
                    >
                      החלפת סיסמה
                    </Button>
                  </Col>
                </Row>
              )}

              {/* Edit Confirmation */}
              {isEditable && (
                <>
                  <Card.Subtitle className="m-2 text-muted">
                    לא ניתן לעדכן חלק מהפרטיים האשיים, אם יש מידע שגוי נא לפנות
                    לועד.
                  </Card.Subtitle>
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
                </>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>
      {/* //* Modals */}
      <ChangeEmail currentMail={email} />
      <ChangePassword />
    </>
  );
}

export default Settings;
