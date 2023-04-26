import React from "react";

//bootstrap components
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//image asset
import Placeholder_Hero from "../../assets/Placeholder_Hero.png";
function Hero() {
  return (
    <Container className="hero-bg">
      <Row className="mt-2">
        <Col md={6} className="ms-2">
          <p className="display-1 mt-3">
            <span className="brand-typeface me-2">נהל</span>
            מערכת הניהול המתקדמת.
          </p>
          <p className="display-5">
            הפתרון <span className="underline-emphasize">המושלם</span> לניהול
            ועדי בית.
          </p>
          <div className="justify-self-center text-center">
            <Button variant="light" className="w-75 text-center">
              ליצור חישבון ועד חדש
            </Button>
          </div>
          <div className="text-center mt-1">
            <p className="fs-5 text-decoration-underline">כבר יש לכם חשבון?</p>
            <Button variant="outline-light" className="w-50">
              כניסת ועד
            </Button>

            <Button variant="outline-light" className="w-auto ms-2">
              כניסת דיירים
            </Button>
          </div>
        </Col>

        <Col className="mt-1">
          {/*//TODO: replace placeholder image */}
          <img
            // src="https://mockups-design.com/wp-content/uploads/2022/07/Free_iMac_Mockup_3.jpg" //!Placeholder link
            src={Placeholder_Hero}
            alt="placeholder image"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
