import React, { useState } from "react";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Settings() {
  const [isEditable, SetIsEditable] = useState(false);

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">הגדרות</h1>

      {/* Details Card */}
      <Card>
        <Card.Header className="fs-3">פרטיים אישיים</Card.Header>

        {/* Card Body */}
        <Card.Body>
          <Form className="m-2">
            <Row>
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fs-5">שם פרטי</Form.Label>
                  <Form.Control
                    defaultValue="ישראל"
                    type="text"
                    required
                    disabled={!isEditable}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fs-5">שם משפחה</Form.Label>
                  <Form.Control
                    defaultValue="ישראלי"
                    type="text"
                    required
                    disabled={!isEditable}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="fs-5">סוג דייר</Form.Label>
                  <Form.Control defaultValue="שכירות" disabled></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fs-5">מספר בניין</Form.Label>
                  <Form.Control defaultValue="1" disabled></Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fs-5">מספר דיירה</Form.Label>
                  <Form.Control defaultValue="2" disabled></Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fs-5">מספר חנייה</Form.Label>
                  <Form.Control defaultValue="24" disabled></Form.Control>
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
                    disabled={!isEditable}
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
            {!isEditable && (
              <Row className="mt-2">
                <hr />
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
                  <Button variant="outline-primary" className="w-100">
                    עדכן מייל
                  </Button>
                </Col>
                <Col>
                  <Button variant="outline-primary" className="w-100">
                    החלפת סיסמה
                  </Button>
                </Col>
                <Card.Subtitle className="m-2 text-muted">
                  לא ניתן לעדכן חלק מהפרטיים האשיים, אם יש מידע שגוי נא לפנות
                  לוועד
                </Card.Subtitle>
              </Row>
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
        </Card.Body>
      </Card>
    </>
  );
}

export default Settings;
