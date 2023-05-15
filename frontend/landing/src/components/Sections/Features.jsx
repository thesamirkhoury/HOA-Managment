import React from "react";

//bootstrap components
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//helper function
import { navigate } from "../../util/Navigate";

function Features() {
  return (
    <Container className="mt-3" id="features">
      <hr />
      <h2 className="mt-2">מה נהל מציעה?</h2>
      <Row className="mt-2">
        <Col md={4}>
          <i className="fs-1 bi bi-cash-stack"></i>
          <p className="fs-4">ניהול פיננסי</p>
          <p className="fs-5">מערכת לניהול הכנסות והוצאות ותיעוד תשלומים.</p>
        </Col>
        <Col md={4}>
          <i className="fs-1 bi bi-megaphone-fill"></i>
          <p className="fs-4">ערוצי תקשורת</p>
          <p className="fs-5">
            ערוצי תקשורת שונות בין הועד לבין הדיירים המותאמות לצרכים שונים.
          </p>
        </Col>
        <Col md={4}>
          <i className="fs-1 bi bi-cone-striped"></i>
          <p className="fs-4">ניהול ספקים ותקלות</p>
          <p className="fs-5">
            מערכת יעודית לניהול ספקי שירות, וניהול קריאות שירות.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4 mb-2 text-center">
          <h5>רוצה להצטרף לכל הטוב הזה?</h5>
          <Button
            variant="outline-light"
            className="w-100 text-center"
            onClick={() => {
              navigate(process.env.REACT_APP_BOARD_SIGNUP);
            }}
          >
            ליצור חישבון ועד חדש
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;
