import React from "react";

//bootstrap components
import Button from "react-bootstrap/Button";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";

function Notfound() {
  return (
    <div className="text-center text-dark">
      <h1 className="fs-huge">404</h1>
      <h2 className="fs-1">לא מצאנו את העמוד שחיפשת.</h2>
      <LinkContainer to="/">
        <Button variant="dark" onClick={() => {}}>
          לעמוד הבית
        </Button>
      </LinkContainer>
    </div>
  );
}

export default Notfound;
