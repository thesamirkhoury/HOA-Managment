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

  const [email, setEmail] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  // When clicking on redirect link scroll to the top of the page.
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  async function handleForgetPassword(e) {
    e.preventDefault();
    //send forgot password request
     await fetch(
      `${process.env.REACT_APP_API_URL}/managers/forgot-password/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    setShowInstructions(true);

    dispatch({ type: "LOADING", payload: false });
  }

  return (
    <Card className="login-card">
      <Card.Body>
        <h1 className="display-4 text-center">איפוס סיסמה</h1>
        <Form className="m-2" onSubmit={handleForgetPassword}>
          {!showInstructions && (
            <Form.Group className="mb-2">
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
          )}
          {!showInstructions ? (
            <Button type="submit" className="w-100 mt-1">
              אפס את הסיסמה
            </Button>
          ) : (
            <div className="instructions fs-5">
              אם המייל שהזנת קיים במערכת, ישלח אליך מייל בקרוב עם הנחיות לאיפוס
              הסיסמה.
            </div>
          )}
        </Form>
        <hr />
        <LinkContainer to="/login" onClick={scrollToTop}>
          <Button className="w-100" variant="outline-primary">
            התחבר לחשבון
          </Button>
        </LinkContainer>

        {/* {error && <div className="error">{error}</div>} */}
      </Card.Body>
    </Card>
  );
}

export default ForgotPassword;
