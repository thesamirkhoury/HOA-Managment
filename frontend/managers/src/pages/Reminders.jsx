import React, { useState } from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import DeleteConfirmation from "../components/modals/DeleteConfirmation";


function Reminders() {
  const { dispatch } = useModalsContext();
  const [deleteData, setDeleteData] = useState();

  const placeholderReminders = Array.from({ length: 10 });
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">תזכורות אחזקה שוטפת</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
        <Col xs={6} md={6} lg={8} xxl={15}>
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
              dispatch({ type: "NEW_SUPPLIER", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>תזכורת חדשה
          </Button>
        </Col>
      </Row>

      <Row xs={1} md={4} lg={8} className="g-4 mt-1">
        {placeholderReminders.map(() => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>טיפול במעליות</Card.Title>
                <Card.Subtitle>18/05/2023 - 10:30</Card.Subtitle>
                <Card.Text>טיפול שוטף במעליות, כולל החלפת חלקים.</Card.Text>
                <Button variant="warning" className="me-1">עדכן</Button>
                <Button variant="outline-danger" onClick={()=>{
                  
                }}>מחק</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Reminders;
