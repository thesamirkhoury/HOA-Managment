import React from "react";
import { Link } from "react-scroll";
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
        <Link to="hero" offset={-50}>
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" width="50" className="logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ms-1 ms-lg-3" navbarScroll>
            <Link to="hero" offset={-50}>
              <Nav.Link>בית</Nav.Link>
            </Link>

            <Link to="selling-points" offset={-75}>
              <Nav.Link>למה נהל?</Nav.Link>
            </Link>

            <Link to="features" offset={-90}>
              <Nav.Link>תכונות המערכת</Nav.Link>
            </Link>

            <Link to="about" offset={500}>
              <Nav.Link>אודות</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default VerticalNav;
