import React from "react";
import { useModalsContext } from "../hook/useModalsContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewInquiry from "../components/modals/NewInquiry";
import InquiryDetails from "../components/modals/InquiryDetails";

function Inquires() {
  const { newInquiry, dispatch } = useModalsContext();
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">פניות לועד</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
        <Col xs={6} md={6} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={6} md={4} lg={3}>
          <Button
            className="ms-4 ms-md-5"
            onClick={() => {
              dispatch({ type: "NEW_INQUIRY", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>פנייה חדשה
          </Button>
        </Col>
      </Row>

      {/* Inquires */}
      {/* //!Placeholder data */}
      <Row xs={1} md={2} lg={3} className="g-3 mt-1">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>החלפת נורות במעלית</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                לפני שעתיים
                <Badge bg="danger" className="fs-6 ms-2">
                  {"פתוח"}
                </Badge>
              </Card.Subtitle>
              <Card.Text>החלפת נורות במעלית</Card.Text>
              <div className="float-end">
                <Button
                  variant="outline-primary"
                  className="me-1"
                  onClick={() => {
                    dispatch({ type: "INQUIRY_DETAILS", payload: true });
                  }}
                >
                  פרטיים
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>החלפת נורות במעלית</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                לפני יומיים
                <Badge bg="success" className="fs-6 ms-2">
                  {"סגור"}
                </Badge>
              </Card.Subtitle>
              <Card.Text>החלפת נורות במעלית</Card.Text>
              <div className="float-end">
                <Button
                  variant="outline-primary"
                  className="me-1"
                  onClick={() => {
                    dispatch({ type: "INQUIRY_DETAILS", payload: true });
                  }}
                >
                  פרטיים
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* //* Modals */}
      <NewInquiry />
      <InquiryDetails />
    </>
  );
}

export default Inquires;
