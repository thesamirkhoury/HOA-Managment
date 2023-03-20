import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Documents() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">מרכז שיטוף מסמכים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
        <Col xs={12} md={6} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם קובץ</th>
            <th>תיאור הקובץ</th>
            <th>תאריך העלאת הקובץ</th>
            <th>הורדה</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>חוזה אחזקת מעליות</td>
            <td>חוזה מפורט לאחזקת מעליות - שנתי 2023</td>
            <td>1/1/2023</td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
              >
                הורדת הקובץ
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Documents;
