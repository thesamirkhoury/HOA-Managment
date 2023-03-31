import React, { useState } from "react";
import { useLogin } from "../hook/useLogin";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useLogin();

  // When clicking on redirect link scroll to the top of the page.
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  async function handleLogin(e) {
    e.preventDefault();
    await login(username, password);
  }

  return (
    // <div className="mt-1 mt-md-5 ms-2">
    <Card className="login-card">
      <Card.Body>
        <h1 className="display-1 text-center">התחבר</h1>
        <Form className="m-2" onSubmit={handleLogin}>
          <Form.Group className="mb-2">
            <Form.Label>שם משתמש</Form.Label>
            <Form.Control
              type="text"
              spellCheck="false"
              autoCorrect="off"
              autoCapitalize="off"
              required
              aria-label="username"
              placeholder="הקליד את שם המשתש"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>סיסמה</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="הקלד את הסיסמה"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="w-100 mt-1">
            התחבר
          </Button>

          <LinkContainer to="/forgot-password" onClick={scrollToTop}>
            <Button className="w-100 mt-1" variant="link">
              שחכת את הסיסמה?
            </Button>
          </LinkContainer>

          {error && <div className="error">{error}</div>}
        </Form>
      </Card.Body>
    </Card>
    // </div>
  );
}

export default Login;
