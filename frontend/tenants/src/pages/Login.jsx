import React, { useState } from "react";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <div className="mt-1 mt-md-5 ms-2">
      <Card>
        <Card.Body>
          <h1 className="display-1 text-center">התחבר</h1>
          <Form className="m-2" onSubmit={handleLogin}>
            <Form.Group className="mb-2">
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

            <Form.Group className="mb-2">
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

            <Row>
              <Col md={{ span: 5, offset: 3 }} className="">
                <Button type="submit" className="w-100">
                  התחבר
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
