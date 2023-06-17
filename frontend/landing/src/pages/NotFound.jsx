import React from "react";

//bootstrap components
import Button from "react-bootstrap/Button";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";
// import assets
import Logo from "../assets/Logo.svg";

function Notfound() {
  return (
    <div className="text-center mt-">
      <img src={Logo} alt="logo" width="150" className="logo mb-3 mt-3" />
      <h1 className="fs-huge">אופס 404!</h1>
      <h2 className="fs-1">לא מצאנו את העמוד שחיפשת.</h2>
      <LinkContainer to="/">
        <Button variant="light" className="w-50 mt-2" onClick={() => {}}>
          לעמוד הבית
        </Button>
      </LinkContainer>
    </div>
  );
}

export default Notfound;
