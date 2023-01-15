import React, { useState } from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Announcements() {
  const { dispatch } = useModalsContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  const placeholderMsgs = [
    {
      HOA: "63a0674e2aa7479524d3f594",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quibusdam consequuntur alias perspiciatis aut placeat reiciendis omnis, quasi autem odit ipsum quis facere soluta impedit debitis nulla minus. Repudiandae animi quos itaque id nisi, rem, quibusdam et, quaerat corrupti nemo laborum. Ducimus, enim laudantium! Reiciendis praesentium cumque libero officia eum.",
      buildingNumber: "2",
      title: "הפסקת מים כללית",
      _id: "63a329baad4e7a94b176a771",
    },
    {
      _id: "63a329c7ad4e7a94b176a773",
      HOA: "63a0674e2aa7479524d3f594",
      title: "ניתוק חשמל כללי",
      body: "היום אחרי הצהרים החשמל ינתק למשך כשעתיים בשל עבודת תשתית",
      buildingNumber: "2",
    },
    {
      _id: "63a329c7ad4e7a94b176a773",
      HOA: "63a0674e2aa7479524d3f594",
      title: "ניתוק חשמל כללי",
      body: "היום אחרי הצהרים החשמל ינתק למשך כשעתיים בשל עבודת תשתית",
      buildingNumber: "2",
    },
    {
      _id: "63a329c7ad4e7a94b176a773",
      HOA: "63a0674e2aa7479524d3f594",
      title: "ניתוק חשמל כללי",
      body: "היום אחרי הצהרים החשמל ינתק למשך כשעתיים בשל עבודת תשתית",
      buildingNumber: "2",
    },
    {
      _id: "63a329c7ad4e7a94b176a773",
      HOA: "63a0674e2aa7479524d3f594",
      title: "ניתוק חשמל כללי",
      body: "היום אחרי הצהרים החשמל ינתק למשך כשעתיים בשל עבודת תשתית",
      buildingNumber: "2",
    },

    {
      _id: "63a329c7ad4e7a94b176a773",
      HOA: "63a0674e2aa7479524d3f594",
      title: "ניתוק חשמל כללי",
      body: "היום אחרי הצהרים החשמל ינתק למשך כשעתיים בשל עבודת תשתית",
      buildingNumber: "1",
    },
    {
      _id: "63a334ef370b5e62a5212206",
      HOA: "63a0674e2aa7479524d3f594",
      title: "בדיקה כללית",
      body: "בדיקת הודעה כללית",
      buildingNumber: "0", //all buildings
    },
  ];
  const placeholderBuildingsCount = 3;

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">הודעות לדיירים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
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
          <Button className="ms-4 ms-md-5" onClick={() => {}}>
            <i className="bi bi-plus-lg"> </i>הודעה חדשה
          </Button>
        </Col>
      </Row>
      {/* Message Accordian */}
      <Accordion alwaysOpen>
        {[...Array(placeholderBuildingsCount + 1)].map((_, id) => (
          <Accordion.Item eventKey={id}>
            <Accordion.Header>
              {id === 0 ? "הודעות כלליות" : `בניין ${id}`}
            </Accordion.Header>
            <Accordion.Body>
              <Row xs={1} md={2} lg={3} className="g-3 mt-1">
                {placeholderMsgs &&
                  placeholderMsgs.map(
                    (msg) =>
                      parseInt(msg.buildingNumber) === id && (
                        <Col key={id}>
                          <Card>
                            <Card.Body>
                              <Card.Title>{msg.title}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                לפני שעתיים
                              </Card.Subtitle>
                              <Card.Text>{msg.body}</Card.Text>
                              <div className="float-end">
                                <Button
                                  variant="warning"
                                  className="me-1"
                                  onClick={() => {}}
                                >
                                  עדכן
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => {
                                    setDeleteData({
                                      id: "1234",
                                      displayName: "ניתק חשמלי כללי",
                                      db: "announcements",
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
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Announcements;
