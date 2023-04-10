import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";
//helper functions
import { range } from "../util/range";

//bootstrap components
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewAnnouncement from "../components/modals/NewAnnouncement";
import EditAnnouncement from "../components/modals/EditAnnouncement";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Announcements() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { announcements, details } = useDataContext();
  const [buildingsCount, setBuildingsCount] = useState();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  useEffect(() => {
    if (!announcements) {
      fetchData("announcements", "SET_ANNOUNCEMENTS");
    }
    if (!details) {
      fetchData("details", "SET_DETAILS");
    }
    if (details) {
      setBuildingsCount(details.buildingCount);
    }
  }, [details]); // eslint-disable-line

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">הודעות לדיירים</h1>
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
              dispatch({ type: "NEW_ANNOUNCEMENT", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>הודעה חדשה
          </Button>
        </Col>
      </Row>
      {/* Message Accordian */}
      <Accordion alwaysOpen>
        {buildingsCount &&
          range(buildingsCount + 1).map((_, number) => (
            // Diviade announcements into buildings
            <Accordion.Item eventKey={number} key={number}>
              <Accordion.Header>
                {number === 0 ? "הודעות כלליות" : `בניין ${number}`}
              </Accordion.Header>
              <Accordion.Body>
                {/* Announcement Cards */}
                <Row xs={1} md={2} lg={3} className="g-3 mt-1">
                  {announcements &&
                    announcements.map(
                      (announcement) =>
                        // group announcements by building number
                        announcement.buildingNumber === number && (
                          <Col key={announcement._id}>
                            <Card>
                              <Card.Body>
                                <Card.Title>{announcement.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {/* //TODO: Better Date Display (e.g. "לפני שעתיים") */}
                                  {announcement.createdAt}
                                </Card.Subtitle>
                                <Card.Text>{announcement.body}</Card.Text>

                                {/* Controll Buttons */}
                                <div className="float-end">
                                  <Button
                                    variant="warning"
                                    className="me-1"
                                    onClick={() => {
                                      setEditData(announcement);
                                      dispatch({
                                        type: "EDIT_ANNOUNCEMENT",
                                        payload: true,
                                      });
                                    }}
                                  >
                                    עדכן
                                  </Button>

                                  <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                      setDeleteData({
                                        id: announcement._id,
                                        displayName: announcement.title,
                                        type: "DELETE_ANNOUNCEMENT",
                                        suffix: "announcements",
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
                        )
                    )}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      {/* //* Modals */}
      <NewAnnouncement buildingsCount={buildingsCount} />
      <EditAnnouncement editData={editData} buildingsCount={buildingsCount} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Announcements;
