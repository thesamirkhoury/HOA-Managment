import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";
//helper functions
import format from "date-fns/format";

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
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { inquires } = useDataContext();
  const [details, setDetails] = useState();

  useEffect(() => {
    if (!inquires) {
      fetchData("inquiries", "SET_INQUIRES");
    }
  }, []); //eslint-disable-line

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
      <Row xs={1} md={3} lg={4}>
        {inquires &&
          inquires.map((inquiry) => (
            <Col className="mt-1" key={inquiry._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{inquiry.subject}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {format(new Date(inquiry.createdAt), "HH:mm dd/MM/yyyy")}
                  </Card.Subtitle>
                  <Badge
                    bg={inquiry.status === "פתוח" ? "danger" : "success"}
                    className="fs-6 ms-1"
                  >
                    {inquiry.status}
                  </Badge>
                  <div className="float-end">
                    <Button
                      variant="outline-primary"
                      className="me-1"
                      onClick={() => {
                        setDetails(inquiry);
                        dispatch({ type: "INQUIRY_DETAILS", payload: true });
                      }}
                    >
                      פרטים
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {/* //* Modals */}
      <NewInquiry />
      <InquiryDetails details={details} />
    </>
  );
}

export default Inquires;
