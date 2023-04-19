import React, { useState } from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";

function ForgotPassword() {
  const { dispatch } = useModalsContext();

  const [username, setUsername] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [error, setError] = useState(null);

  // When clicking on redirect link scroll to the top of the page.
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  async function handleForgetPassword(e) {
    e.preventDefault();
    dispatch({ type: "LOADING", payload: true });
    //send forgot password request
    const response = await fetch(
      "http://localhost:4000/api/tenants/forgot-password/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setShowInstructions(true);
    }

    dispatch({ type: "LOADING", payload: false });
  }

  return (
    <Card className="login-card">
      <Card.Body>
        <h1 className="display-4 text-center">איפוס סיסמה</h1>
        <Form className="m-2" onSubmit={handleForgetPassword}>
          {!showInstructions && (
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
          )}
          {!showInstructions ? (
            <Button type="submit" className="w-100 mt-1">
              אפס סיסמה
            </Button>
          ) : (
            <div className="instructions fs-5">
              אם שם המשתמש שהזנת קיים במערכת, ישלח אליך מייל המעודכן בקרוב עם הנחיות
              לאיפוס הסיסמה.
            </div>
          )}
        </Form>
        <hr />
        <LinkContainer to="/login" onClick={scrollToTop}>
          <Button className="w-100" variant="outline-primary">
            התחבר לחשבון
          </Button>
        </LinkContainer>

        {error && <div className="error">{error}</div>}
      </Card.Body>
    </Card>
  );
}

export default ForgotPassword;
