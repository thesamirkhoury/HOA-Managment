import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Maintenance() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">קריאות שירות</h1>

      {/* Open Requests */}
      <h1 className="display-3">קריאות פתוחות</h1>
      {/*Opened Requests - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={12} md={12} lg={10} xxl={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש קריאות פתוחות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
      </Row>
      {/* Open Requests Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>נושא הקריאה</th>
            <th>תאריך הפתיחה</th>
            <th>סטטוס טיפול</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>ישראל ישראלי</td>
            <td>החלפת נורות במעלית</td>
            <td>1/1/2023</td>
            <td>נקלט במערכת</td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {}}
              >
                פרטים ולהשיב
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Closed Requests */}
      <h1 className="display-3">קריאות סגורות</h1>
      {/*Closed Requests - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={12} md={12} lg={10} xxl={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש קריאות סגורות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
      </Row>
      {/* Closed Inquires Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>נושא הפנייה</th>
            <th>תאריך סגירה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>ישראל ישראלי</td>
            <td>החלפת נורות במעלית</td>
            <td>1/1/2023</td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {}}
              >
                פרטים
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Maintenance;
