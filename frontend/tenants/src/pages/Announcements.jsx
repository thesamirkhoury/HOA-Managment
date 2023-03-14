import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Announcements() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">הודעות הועד</h1>
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
      </Row>
      {/* Message Accordian */}
      <Accordion alwaysOpen>
        {/* General Messages Accordian */}
        <Accordion.Item eventKey={0}>
          <Accordion.Header>הודעות כלליות</Accordion.Header>
          <Accordion.Body>
            <Row xs={1} md={2} lg={3} className="g-3 mt-1">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>בדיקה כללית</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      לפני שעתיים
                    </Card.Subtitle>
                    <Card.Text>בדיקת הודעה כללית</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        {/* Building Specific Messages */}
        {/* //! Placeholder Data: BLD Num 1 */}
        <Accordion.Item eventKey={1}>
          <Accordion.Header>בניין 1</Accordion.Header>
          <Accordion.Body>
            <Row xs={1} md={2} lg={3} className="g-3 mt-1">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>ניתוק חשמל כללי</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      לפני שעתיים
                    </Card.Subtitle>
                    <Card.Text>
                      היום אחרי הצהרים החשמל ינתק למשך כשעתיים בשל עבודת תשתית
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Announcements;
