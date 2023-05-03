import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataHandler } from "../hooks/useDataHandler";
import { useDataContext } from "../hooks/useDataContext";
//helper functions
import format from "date-fns/format";

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
  const { reminders } = useDataContext();
  const { fetchData } = useDataHandler();
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  // fetch reminders data
  useEffect(() => {
    if (!reminders) {
      fetchData("reminders", "SET_REMINDERS");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - תזכורות אחזקה</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">תזכורות אחזקה</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
        <Col xs={6} md={6} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש תזכורות..."
              className="ms-3 ms-md-3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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
      {/* Reminder Cards */}
      <Row xs={1} md={4} lg={8} className="g-4 mt-1">
        {reminders &&
          reminders
            .filter((item) => {
              //Search Logic
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search.toLowerCase()) ||
                    format(
                      new Date(item.dateAndTime),
                      "dd/MM/yyyy HH:mm"
                    ).includes(search) ||
                    item.body.toLowerCase().includes(search.toLowerCase());
            })
            .map((reminder) => (
              <Col key={reminder._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{reminder.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {format(
                        new Date(reminder.dateAndTime),
                        "HH:mm dd/MM/yyyy"
                      )}
                    </Card.Subtitle>
                    <Card.Text>{reminder.body}</Card.Text>
                    <div className="mt-3 float-end">
                      <Button
                        variant="outline-primary"
                        className="me-1"
                        onClick={() => {
                          setEditData(reminder);
                          dispatch({ type: "EDIT_REMINDER", payload: true });
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
                          dispatch({
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
