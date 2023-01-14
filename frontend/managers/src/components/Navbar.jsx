import React from "react";

//bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

// import assets
import Logo from "../assets/Logo.svg"

function VerticalNav({ setShow }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {/* //TODO: connect with sidebar, show only when logged in */}
        {/* Sidebar expand button, on smaller screen */}
        <Navbar.Toggle aria-controls="expand Sidebar" onClick={() => {
          setShow(true);
        }} />
        <Navbar.Brand href="/">
          <img src={Logo} alt="logo" width="50" className="logo" />
        </Navbar.Brand>
        {/* //TODO: implement dynamic hook, show only when logged in */}
        {/* Dynamically updated Wifi status */}
        <div className="d-flex ">
          <i className="bi bi-wifi-off fs-5 fw-bold text-danger me-1"></i>
          <h6 className="fs-4 fw-bold text-light">לא מחובר</h6>
        </div>
      </Container>
    </Navbar>
  );
}

export default VerticalNav;
