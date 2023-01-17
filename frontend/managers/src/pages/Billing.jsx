import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Billing() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">ניהול חיובים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
        <Col xs={6} md={6} lg={8} xxl={12}>
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
            <i className="bi bi-plus-lg"> </i>חיוב חדש
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>סכום</th>
            <th>סוג תשלום</th>
            <th>תאריך חשבונית</th>
            <th>לתשלום עד</th>
            <th>סטטוס תשלום</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>ישראל ישראלי</td>
            <td>200</td>
            <td>חודשי</td>
            <td>1/1/2023</td>
            <td>28/1/2023</td>
            <td>לא שולם</td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {}}
              >
                תיעוד תשלום
              </Button>
              <Button
                variant="outline-secondary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {}}
              >
                שליחת תזכורת
              </Button>
              <Button
                variant="outline-warning"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {}}
              >
                עדכן
              </Button>

              <Button variant="outline-danger" onClick={() => {}}>
                מחק
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Billing;
