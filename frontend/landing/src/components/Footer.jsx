import React from "react";

//bootstrap spacing
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Router Nav Link
import { Link } from "react-router-dom";
// import assets
import Logo from "../assets/Logo.svg";

function Footer() {
  return (
    <div className="footer">
      <Container className="text-center">
        <Row>
          <Col className="mt-2" xs={2} md={1}>
            <img src={Logo} alt="nahel logo" width="50" />
          </Col>
          <Col className="mt-2">
            <Link to="/terms" className="brand-link">
              תנאי שימוש
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>מערכת נהל - ניהול ועד בית &copy; 2023</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
