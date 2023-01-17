import React from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import InquiryReply from "../components/modals/InquiryReply";
import InquiryDetails from "../components/modals/InquiryDetails";

function Inquires() {
  const { dispatch } = useModalsContext();

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">פניות דיירים</h1>

      {/* Open Inquiries */}
      <h1 className="display-3">פניות פתוחות</h1>
      {/*Opened Inquiries - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={12} md={12} lg={10} xxl={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש פניות פתוחות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
      </Row>
      {/* Open Inquires Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>נושא הפנייה</th>
            <th>תאריך הפתיחה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>ישראל ישראלי</td>
            <td>דחיית תשלום דמי הועד</td>
            <td>1/1/2023</td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {
                  dispatch({ type: "INQUIRY_REPLY", payload: true });
                }}
              >
                פרטים ולהשיב
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Closed Inquiries */}
      <h1 className="display-3">פניות סגורות</h1>
      {/*Closed Inquiries - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={12} md={12} lg={10} xxl={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש פניות סגורות..."
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
            <td>דחיית תשלום דמי הועד</td>
            <td>1/1/2023</td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {
                  dispatch({ type: "INQUIRY_VIEW", payload: true });
                }}
              >
                פרטים
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* //* Modals */}
      <InquiryReply />
      <InquiryDetails />
    </>
  );
}

export default Inquires;
