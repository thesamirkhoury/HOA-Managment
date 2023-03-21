import React, { useState } from "react";
import { useModalsContext } from "../hooks/useModalsContext";

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

  const [isEditableHOA, SetIsEditableHOA] = useState(false);
  const [isEditablePersonal, SetIsEditablePersonal] = useState(false);

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">הגדרות</h1>

      {/* HOA Details */}
      <Card>
        <Card.Header className="fs-3">פרטי הועד</Card.Header>
        {/* Card Body */}
        <Card.Body>
          <Form className="m-2">
            <Row>
              <Form.Group>
                <Form.Label className="fs-5">כתובת</Form.Label>
                <Form.Control
                  defaultValue="רחוב יעקב שרייבום 26, רמת בית הכרם ירושלים"
                  type="text"
                  required
                  disabled={!isEditableHOA}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="fs-5">מספר בניינים</Form.Label>
                  <Form.Control
                    defaultValue="3"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                    disabled={!isEditableHOA}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="fs-5">דמי ועד חושיים</Form.Label>
                  <Form.Control
                    defaultValue="250"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                    disabled={!isEditableHOA}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/* Edit data */}
            {!isEditableHOA && (
              <Row className="mt-2">
                <hr />
                <Col>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => {
                      SetIsEditableHOA(true);
                    }}
                  >
                    עדכן פרטיים
                  </Button>
                </Col>
                <Card.Subtitle className="m-2 text-muted">
                  לא ניתן לעדכן חלק מהפרטיים האשיים, אם יש מידע שגוי נא לפנות
                  לועד.
                </Card.Subtitle>
              </Row>
            )}
            {/* Edit Confirmation */}
            {isEditableHOA && (
              <div className="mt-3 float-end">
                <Button variant="outline-success" type="submit">
                  עדכן פרטיים
                </Button>
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => {
                    SetIsEditableHOA(false);
                  }}
                >
                  בטל
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Personal Data */}
      <Card className="mt-2">
        <Card.Header className="fs-3">פרטיים אישיים</Card.Header>
        {/* Card Body */}
        <Card.Body>
          <Form className="m-2">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-5">שם פרטי</Form.Label>
                  <Form.Control
                    defaultValue="ישראל"
                    type="text"
                    required
                    disabled={!isEditablePersonal}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-5">שם משפחה</Form.Label>
                  <Form.Control
                    defaultValue="ישראלי"
                    type="text"
                    required
                    disabled={!isEditablePersonal}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <hr />
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-5">מספר טלפון</Form.Label>
                  <Form.Control
                    defaultValue="0521234567"
                    type="tel"
                    required
                    disabled={!isEditablePersonal}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="fs-5">מייל</Form.Label>
                  <Form.Control
                    defaultValue="israelisraeli@gmail.com"
                    type="email"
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/* Edit data, Password & Email reset */}
            {!isEditablePersonal && (
              <Row className="mt-2">
                <hr />
                <Col>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => {
                      SetIsEditablePersonal(true);
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
            {isEditablePersonal && (
              <div className="mt-3 float-end">
                <Button variant="outline-success" type="submit">
                  עדכן פרטיים
                </Button>
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => {
                    SetIsEditablePersonal(false);
                  }}
                >
                  בטל
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
      {/* //* Modals */}
      <ChangeEmail />
      <ChangePassword />
    </>
  );
}

export default Settings;
