import React from "react";

//bootstrap spacing
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SellingPoints() {
  return (
    <Container className="mt-3">
      <h2>למה לבחור נהל?</h2>
      <Row className="mt-2">
        <Col md={4}>
          <i className="fs-1 bi bi-clock-history"></i>
          <p className="fs-5">מערכת זמינה 24/7 מכל מקום ומכל מכשיר בעולם.</p>
        </Col>
        <Col md={4}>
          <i className="fs-1 bi bi-cloud"></i>
          <p className="fs-5">
            אפס התקנות, והתחלת שימוש מידית. המערכת מתנהלת בענן.
          </p>
        </Col>
        <Col md={4}>
          <i className="fs-1 bi bi-clipboard2-data"></i>
          <p className="fs-5">
            כל המידע והכלים שהועד והדייר יצטרכו, מרוכז במקום אחד.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SellingPoints;
