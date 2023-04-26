import React from "react";

//bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
// import assets
import Logo from "../assets/Logo.svg";

function VerticalNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <img src={Logo} alt="logo" width="50" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ms-1 ms-lg-3" navbarScroll>
            <Nav.Link>בית</Nav.Link>
            <Nav.Link>למה נהל?</Nav.Link>
            <Nav.Link>תכונות המערכת</Nav.Link>
            <Nav.Link>אודות</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default VerticalNav;
