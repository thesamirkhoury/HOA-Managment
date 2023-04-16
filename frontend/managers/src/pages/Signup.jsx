import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [membersMonthlyFee, setMembersMonthlyFee] = useState("");
  const [buildingCount, setBuildingCount] = useState("");

  const { signup, error } = useSignup();

  // When clicking on redirect link scroll to the top of the page.
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  async function handleSignup(e) {
    e.preventDefault();

    await signup(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      address,
      membersMonthlyFee,
      buildingCount,
      fileNumber
    );
  }

  return (
    <div className="mt-1 mt-md-5 ms-2">
      <Card>
        <Card.Body>
          <h1 className="display-1 text-center">פתיחת חשבון ועד בית חדש</h1>

          <Form className="m-2" onSubmit={handleSignup}>
            <p className="fs-4 text-decoration-underline">פרטים אישיים</p>
            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>שם פרטי</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="ישראל"
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
                    placeholder="ישראלי"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>מייל</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>מספר טלפון</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    placeholder="0512345678"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
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
                    placeholder="הקלד סיסמה"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>אימות סיסמה חדשה</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="הקלד סיסמה פעם נוספת"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <hr />
            <p className="fs-4 text-decoration-underline">פרטי הועד</p>

            <Row>
              <Col md={8} className="mb-2">
                <Form.Group>
                  <Form.Label>כתובת מלאה</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="מספר בניין, רחוב, עיר ומדינה"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="mb-2">
                <Form.Group>
                  <Form.Label>מספר תיק</Form.Label>
                  <Form.Control
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="any"
                    required
                    placeholder="מספר תיק בפנקס הבית המשותף"
                    value={fileNumber}
                    onChange={(e) => {
                      setFileNumber(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-2">
                <Form.Group>
                  <Form.Label>כמות הבניינים</Form.Label>
                  <Form.Control
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                    placeholder="כמות הבניינים שמנהל הועד"
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
                    placeholder="סכום חודשי"
                    value={membersMonthlyFee}
                    onChange={(e) => {
                      setMembersMonthlyFee(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="text-center mt-2">
                <Button type="submit" className="w-50">
                  צור חישבון חדש
                </Button>
              </Col>
            </Row>

            {error && <div className="error">{error}</div>}
          </Form>

          <hr />

          <p className="text-center fs-5">יש לך כבר חשבון?</p>
          <Col className="text-center">
            <LinkContainer to="/login" onClick={scrollToTop}>
              <Button variant="outline-primary">התחבר לחשבון</Button>
            </LinkContainer>
          </Col>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
