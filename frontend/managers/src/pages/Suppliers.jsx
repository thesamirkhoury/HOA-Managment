import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Suppliers() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">ניהול ספקים</h1>
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
              // dispatch({ type: "NEW_TENANT", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>ספק חדש
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover>
        <thead className="text-center">
          <tr>
            <th>שם ספק</th>
            <th>תחום התמחות</th>
            <th>סוג ספק</th>
            <th>מספר טלפון</th>
            <th>מייל</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>מעליות בעמ</td>
            <td>מעליות</td>
            <td>חברה</td>
            <td>
              <a href="tel:+9721700123123" className="text-decoration-none">
                1700123123
              </a>
            </td>
            <td>
              <a
                href="mailto:hello@elevetorsil.co.il"
                className="text-decoration-none"
              >
                hello@elevetorsil.co.il
              </a>
            </td>
            <td>
              <Button
                variant="outline-warning"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {}}
              >
                עדכן פרטים
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

export default Suppliers;
