import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";
//helper functions
import formatDistanceToNowStrict from "date-fns/formatDistanceToNow";
import { he } from "date-fns/locale";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Announcements() {
  const { fetchData } = useDataHandler();
  const { announcements } = useDataContext();

  useEffect(() => {
    if (!announcements) {
      fetchData("announcements", "SET_ANNOUNCEMENTS");
    }
  }, [announcements]); // eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - הודעות</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">הודעות הועד</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            className="ms-4 ms-md-2"
            onClick={() => {
              fetchData("announcements", "SET_ANNOUNCEMENTS");
            }}
          >
            <i className="bi bi-arrow-repeat"> </i>רענן מידע
          </Button>
        </Col>
      </Row>
      {/* Message Accordian */}
      <Accordion alwaysOpen>
        {/* General Messages Accordian */}
        <Accordion.Item eventKey={0}>
          <Accordion.Header>הודעות כלליות</Accordion.Header>
          <Accordion.Body>
            <Row xs={1} md={2} xl={3}>
              {announcements &&
                announcements.map(
                  (announcement) =>
                    announcement.buildingNumber === 0 && (
                      <Col key={announcement._id} className="mt-1">
                        <Card>
                          <Card.Body>
                            <Card.Title>{announcement.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {formatDistanceToNowStrict(
                                new Date(announcement.createdAt),
                                { addSuffix: true, locale: he }
                              )}
                            </Card.Subtitle>
                            <Card.Text>{announcement.body}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                )}
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Building Specific Messages */}
        <Accordion.Item eventKey={1}>
          <Accordion.Header>הודעות לבניין שלי</Accordion.Header>
          <Accordion.Body>
            <Row xs={1} md={2} lg={3} className="g-3 mt-1">
              {announcements &&
                announcements.map(
                  (announcement) =>
                    announcement.buildingNumber !== 0 && (
                      <Col key={announcement._id}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{announcement.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {formatDistanceToNowStrict(
                                new Date(announcement.createdAt),
                                { addSuffix: true, locale: he }
                              )}
                            </Card.Subtitle>
                            <Card.Text>{announcement.body}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                )}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Announcements;
