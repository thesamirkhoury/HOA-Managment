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
import NewReminder from "../components/modals/NewReminder";
import EditReminder from "../components/modals/EditReminder";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Reminders() {
  const { dispatch } = useModalsContext();
  const [editData, setEditData] = useState();
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
              dispatch({ type: "NEW_REMINDER", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>תזכורת חדשה
          </Button>
        </Col>
      </Row>

      <Row xs={1} md={4} lg={8} className="g-4 mt-1">
        {placeholderReminders.map((_, id) => (
          <Col key={id}>
            <Card>
              <Card.Body>
                <Card.Title>טיפול במעליות</Card.Title>
                <Card.Subtitle>18/05/2023 - 10:30</Card.Subtitle>
                <Card.Text>טיפול שוטף במעליות, כולל החלפת חלקים.</Card.Text>
                <Button
                  variant="warning"
                  className="me-1"
                  onClick={() => {
                    setEditData({
                      name: "טיפול במעליות",
                    });
                    dispatch({ type: "EDIT_REMINDER", payload: true });
                  }}
                >
                  עדכן
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setDeleteData({
                      id: "1234",
                      displayName: "טיפול במעליות",
                      db: "reminders",
                    });
                    dispatch({ type: "DELETE_CONFIRMATION", payload: true });
                  }}
                >
                  מחק
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* //* Modals */}
      <NewReminder />
      <EditReminder editData={editData} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Reminders;
