import React from "react";

//bootstrap components
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//image asset
import Hero_Img from "../../assets/Hero_Section_Img.jpg";
//helper function
import { navigate } from "../../util/Navigate";

function Hero() {
  return (
    <Container className="hero-bg" id="hero">
      <Row className="mt-2">
        <Col xs={12} md={6} className="ms-md-2">
          <p className="display-1 mt-3">
            <span className="brand-typeface me-2">נהל</span>
            מערכת הניהול המתקדמת.
          </p>
          <p className="display-5">
            הפתרון <span className="underline-emphasize">המושלם</span> לניהול
            ועדי בית.
          </p>
          <div className="justify-self-center text-center">
            <Button
              variant="light"
              className="w-75 text-center"
              onClick={() => {
                navigate(process.env.REACT_APP_BOARD_SIGNUP);
              }}
            >
              ליצור חשבון ועד חדש
            </Button>
          </div>
          <Row className="text-center mt-1">
            <p className="fs-4 text-decoration-underline">כבר יש לכם חשבון?</p>
            <Col>
              <Button
                variant="outline-light"
                className="ms-1 w-100"
                onClick={() => {
                  navigate(process.env.REACT_APP_BOARD_LOGIN);
                }}
              >
                כניסת ועד
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-light"
                className="w-100 me-1"
                onClick={() => {
                  navigate(process.env.REACT_APP_TENANTS_LOGIN);
                }}
              >
                כניסת דיירים
              </Button>
            </Col>
          </Row>
        </Col>

        <Col className="mt-2 mt-md-1">
          <img
            src={Hero_Img}
            alt="board dashboard demo screenshot"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
