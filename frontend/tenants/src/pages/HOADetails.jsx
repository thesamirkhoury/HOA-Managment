import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function HOADetails() {
  const { fetchData } = useDataHandler();
  const { hoa } = useDataContext();

  //fetch hoa details data
  useEffect(() => {
    if (!hoa) {
      fetchData("hoa", "SET_HOA");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - אודות הוועד</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">אודות הוועד</h1>
      {/* Details Card */}
      <Card>
        {hoa && (
          <Form className="m-2">
            <Form.Group>
              <Form.Label className="fs-2">כתובת הבניין</Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={hoa.address}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">שם ראש ועד הבית</Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={`${hoa.firstName} ${hoa.lastName}`}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">
                מספר תיק בפנקס הבית המשותף
              </Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={hoa.fileNumber}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">גוש</Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={hoa.block}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">חלקה</Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={hoa.parcel}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">דמי ועד חודשיים</Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={`${hoa.membersMonthlyFee} ₪`}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-2">סוג דמי ועד</Form.Label>
              <Form.Control
                readOnly
                disabled
                defaultValue={hoa.feeType}
              ></Form.Control>
            </Form.Group>
          </Form>
        )}
      </Card>
    </>
  );
}

export default HOADetails;
