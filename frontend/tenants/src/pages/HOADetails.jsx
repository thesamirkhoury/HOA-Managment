import React from "react";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function HOADetails() {
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">אודות הועד</h1>
      {/* Details Card */}
      <Card>
        <Card.Text>
          <Form className="m-2">
            <Form.Group>
              <Form.Label className="fs-2">כתובת הבניין</Form.Label>
              <Form.Control
                defaultValue="רחוב יעקב שרייבום 26, רמת בית הכרם ירושלים"
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">שם ראש ועד הבית</Form.Label>
              <Form.Control
                defaultValue="ישראל ישראלי"
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">מספר הבניינים</Form.Label>
              <Form.Control
                defaultValue="3"
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">דמי ועד חודשיים</Form.Label>
              <Form.Control
                defaultValue="250.00₪"
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>
          </Form>
        </Card.Text>
      </Card>
    </>
  );
}

export default HOADetails;
