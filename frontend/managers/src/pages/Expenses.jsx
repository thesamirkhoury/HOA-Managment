import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Expenses() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">ניהול הוצאות</h1>
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
          <Button className="ms-4 ms-md-5" onClick={() => {}}>
            <i className="bi bi-plus-lg"> </i>הוצאה חדשה
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם ספק</th>
            <th>קטגוריה</th>
            <th>סכום</th>
            <th>פירוט</th>
            <th>סוג תשלום</th>
            <th>תאריך התשלום</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>חברת המעליות בע״מ</td>
            <td>מעליות</td>
            <td>2000</td>
            <td>
              1750 - חלקי חילוף
              <br />
              350 - עבודה
            </td>
            <td>חד פעמי</td>
            <td>1/1/2023</td>
            <td>
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

export default Expenses;
