import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreatePassword } from "../hook/useCreatePassword";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CreatePassword() {
  let { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const { createPassword, error } = useCreatePassword();

  async function handleCreatePassword(e) {
    e.preventDefault();
    await createPassword(resetToken, password);
  }

  return (
    <div className="mt-1 mt-md-5 ms-2">
      <Card>
        <Card.Body>
          <h1 className="display-1 text-center">בחר סיסמה</h1>
        </Card.Body>
        <Form className="m-2" onSubmit={handleCreatePassword}>
          <Form.Group className="mb-2">
            <Form.Label>סימסה</Form.Label>
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
          {error && <div className="error">{error}</div>}
        </Form>
      </Card>
    </div>
  );
}

export default CreatePassword;
