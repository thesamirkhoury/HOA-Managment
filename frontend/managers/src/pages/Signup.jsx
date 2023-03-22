import React, { useState } from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [buildingCount, setBuildingCount] = useState("");

  return (
    <div className="mt-1 mt-md-5 ms-2">
      <Card className="">
        <Card.Body>
          <h1 className="display-1 text-center">הרשמת ועד בית חדש</h1>
          <Form className="m-2">
            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>שם פרטי</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
              </Col>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>שם משפחה</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>מייל</Form.Label>
                  <Form.Control type="email" required></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>סיסמה</Form.Label>
                  <Form.Control type="password" required></Form.Control>
                </Form.Group>
              </Col>
              <Col className="mb-2">
                <Form.Group>
                  {/* //TODO: Implement Later and remove disabled tag */}
                  <Form.Label>אימות סיסמה</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>כתובת מלאה</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>מספר בניינים</Form.Label>
                  <Form.Control
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>דמי ועד חודשיים</Form.Label>
                  <Form.Control
                    type="currency"
                    inputMode="decimal"
                    min="1"
                    step="any"
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
