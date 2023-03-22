import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [membersMonthlyFee, setMembersMonthlyFee] = useState("");
  const [buildingCount, setBuildingCount] = useState("");

  const { signup, error } = useSignup();

  async function handleSignup(e) {
    e.preventDefault();
    await signup(
      firstName,
      lastName,
      email,
      password,
      address,
      membersMonthlyFee,
      buildingCount
    );
  }

  return (
    <div className="mt-1 mt-md-5 ms-2">
      <Card>
        <Card.Body>
          <h1 className="display-1 text-center">הרשמת ועד בית חדש</h1>

          <Form className="m-2" onSubmit={handleSignup}>
            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>שם פרטי</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>שם משפחה</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>מייל</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>סיסמה</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Form.Control>
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
                  <Form.Control
                    type="text"
                    required
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  ></Form.Control>
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
                    value={buildingCount}
                    onChange={(e) => {
                      setBuildingCount(e.target.value);
                    }}
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
                    value={membersMonthlyFee}
                    onChange={(e) => {
                      setMembersMonthlyFee(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 5, offset: 3 }} className="">
                <Button type="submit" className="w-100">
                  הירשם
                </Button>
              </Col>
            </Row>

            {error && <div className="error">{error}</div>}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
