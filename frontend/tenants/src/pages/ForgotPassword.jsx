import React, { useState } from "react";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  // When clicking on redirect link scroll to the top of the page.
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  async function handleForgetPassword(e) {
    e.preventDefault();
    //TODO: send a request for a password reset
    setShowInstructions(true);
  }

  return (
    <Card className="login-card">
      <Card.Body>
        <h1 className="display-3 text-center">איפוס סיסמה</h1>
        <Form className="m-2" onSubmit={handleForgetPassword}>
          {!showInstructions && (
            <Form.Group className="mb-2">
              <Form.Label>שם משתמש</Form.Label>
              <Form.Control
                type="text"
                required
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
              אם שם המשתמש שהזנת קיים במערכת, ישלחו אליך מייל בקרוב עם הנחיות לאיפוס הסיסמה.
            </div>
          )}
        </Form>
        <hr />
        <LinkContainer to="/login" onClick={scrollToTop}>
          <Button className="w-100" variant="outline-primary">
            התחבר לחשבון
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default ForgotPassword;
