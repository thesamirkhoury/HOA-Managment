import React from "react";
import { useModalsContext } from "../hooks/useModalsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";
// import assets
import Logo from "../assets/Logo.svg";

function VerticalNav() {
  const { dispatch } = useModalsContext();
  const { user } = useAuthContext();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {/* Sidebar expand button, on smaller screen,displayed only when logged in */}
        {user && (
          <Navbar.Toggle
            aria-controls="expand Sidebar"
            onClick={() => {
              dispatch({ type: "OFFCANVAS", payload: true });
            }}
          />
        )}
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={Logo} alt="logo" width="50" className="logo" />
          </Navbar.Brand>
        </LinkContainer>
        {/* //TODO: implement dynamic hook */}
        {/* Dynamically updated Wifi status,displayed only when logged in */}
        {user && (
          <div className="d-flex ">
            <i className="bi bi-wifi-off fs-5 fw-bold text-danger me-1"></i>
            <h6 className="fs-4 fw-bold text-light">לא מחובר</h6>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default VerticalNav;
