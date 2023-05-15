import React from "react";

//bootstrap components
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//image asset
import Placeholder_Hero from "../../assets/Placeholder_Hero.png";
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
                navigate("http://localhost:3000/signup"); //!Placeholder URL
              }}
            >
              ליצור חישבון ועד חדש
            </Button>
          </div>
          <div className="text-center mt-1">
            <p className="fs-5 text-decoration-underline">כבר יש לכם חשבון?</p>
            <Button
              variant="outline-light"
              className="w-50"
              onClick={() => {
                navigate("http://localhost:3000/login"); //!Placeholder URL
              }}
            >
              כניסת ועד
            </Button>

            <Button
              variant="outline-light"
              className="w-auto ms-2"
              onClick={() => {
                navigate("http://localhost:3001/login"); //!Placeholder URL
              }}
            >
              כניסת דיירים
            </Button>
          </div>
        </Col>

        <Col className="mt-2 mt-md-1">
          <img
            src={Placeholder_Hero}
            alt="placeholder display"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
