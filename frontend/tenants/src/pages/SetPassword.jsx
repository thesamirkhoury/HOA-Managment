import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useResetPassword } from "../hook/useResetPassword";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SetPassword() {
  let { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const { resetPassword, error } = useResetPassword();

  async function handleCreatePassword(e) {
    e.preventDefault();
    await resetPassword(resetToken, password);
  }

  return (
    <Card className="login-card">
      <Card.Body>
        <h1 className="display-5 text-center">הגדרת סיסמה</h1>
      </Card.Body>
      <Form className="m-2" onSubmit={handleCreatePassword}>
        <Form.Group className="mb-2">
          <Form.Label>בחר סיסמה חדשה</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="w-100 mt-1">
           התחבר למערכת
        </Button>
        {error && <div className="error">{error}</div>}
      </Form>
    </Card>
  );
}

export default SetPassword;
