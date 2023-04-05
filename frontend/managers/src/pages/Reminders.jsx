import React, { useState, useEffect } from "react";

//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDataContext } from "../hooks/useDataContext";
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
  const { dispatch: showModal } = useModalsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { reminders, dispatch } = useDataContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  // fetch reminders data
  useEffect(() => {
    async function fetchReminders() {
      showModal({ type: "LOADING", payload: true });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/managers/reminders`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_REMINDERS", payload: json });
        showModal({ type: "LOADING", payload: false });
      }
      if (!response.ok) {
        //if user logs in with illegal or incorrect token
        if (json.error === "Request is not authorized") {
          logout();
          showModal({ type: "LOADING", payload: false });
        }
      }
    }
    if (!reminders) {
      fetchReminders();
    }
  }, [dispatch, showModal, user]); //eslint-disable-line

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">תזכורות אחזקה</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
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
              showModal({ type: "NEW_REMINDER", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>תזכורת חדשה
          </Button>
        </Col>
      </Row>
      {/* Reminder Cards */}
      <Row xs={1} md={4} lg={8} className="g-4 mt-1">
        {reminders &&
          reminders.map((reminder) => (
            <Col key={reminder._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{reminder.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {reminder.dateAndTime}
                  </Card.Subtitle>
                  <Card.Text>{reminder.body}</Card.Text>
                  <div className="mt-3 float-end">
                    <Button
                      variant="outline-primary"
                      className="me-1"
                      onClick={() => {
                        setEditData(reminder);
                        showModal({ type: "EDIT_REMINDER", payload: true });
                      }}
                    >
                      עדכן
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setDeleteData({
                          id: reminder._id,
                          displayName: reminder.title,
                          type: "DELETE_REMINDER",
                          suffix: "reminders",
                        });
                        showModal({
                          type: "DELETE_CONFIRMATION",
                          payload: true,
                        });
                      }}
                    >
                      מחק
                    </Button>
                  </div>
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
