import React, { useEffect } from "react";
//custom hooks
import { useModalsContext } from "../hook/useModalsContext";
import { useDataContext } from "../hook/useDataContext";
import { useDataHandler } from "../hook/useDataHandler";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewMaintenance from "../components/modals/NewMaintenance";

function Maintenance() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { maintenance } = useDataContext();

  useEffect(() => {
    if (!maintenance) {
      fetchData("maintenance", "SET_MAINTENANCE");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">קריאות שירות</h1>
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
              dispatch({ type: "NEW_MAINTENANCE", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>קריאה חדשה
          </Button>
        </Col>
      </Row>
      {/* Maintenance Requests */}
      <Row xs={1} md={3} xl={4}>
        {maintenance &&
          maintenance.map((request) => (
            <Col className="mt-1" key={request._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{request.subject}</Card.Title>
                  {/* //TODO: Better Date Display (e.g. "לפני שעתיים") */}
                  <Card.Subtitle className="mb-2 text-muted">
                    {request.createdAt}
                  </Card.Subtitle>
                  <Badge
                    bg={request.status === "פתוח" ? "danger" : `${request.status === "סגור"? "success":"warning"}`}
                    className="fs-6 ms-1"
                  >
                    {request.status}
                  </Badge>
                  <Card.Text className="mt-2">{request.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      {/* //* Modals */}
      <NewMaintenance />
    </>
  );
}

export default Maintenance;
