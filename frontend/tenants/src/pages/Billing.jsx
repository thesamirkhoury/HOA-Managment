import React from "react";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Billing() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">חיובים וחישבונות</h1>
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
      {/* Bills Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>תיאור</th>
            <th>סכום</th>
            <th>סוג תשלום</th>
            <th>תאריך הנפקה</th>
            <th>לתשלום עד</th>
            <th>סטטוס תשלום</th>
            <th>הורדות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>דמי ועד חודשיים</td>
            <td>200</td>
            <td>חודשי</td>
            <td>1/1/2023</td>
            <td>28/1/2023</td>
            <td>לא שולם</td>
            <td>
              {/* //TODO: Check if status is paid download Receipt, if ot paid download quote */}
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
              >
                דרישת תשלום
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Billing;
