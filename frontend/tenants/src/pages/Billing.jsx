import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";
//helper functions
import format from "date-fns/format";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BillingDetails from "../components/modals/BillingDetails";

function Billing() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { billings } = useDataContext();
  const [details, setDetails] = useState();

  useEffect(() => {
    if (!billings) {
      fetchData("billing", "SET_BILLINGS");
    }
    console.log(billings);
  }, []); //eslint-disable-line

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">חיובים וחשבונות</h1>
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
            <th>סוג תשלום</th>
            <th>סכום</th>
            <th>תאריך הנפקה</th>
            <th>לתשלום עד</th>
            <th>סטטוס תשלום</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {billings &&
            billings.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.paymentType}</td>
                <td>{bill.amount}</td>
                <td>{format(new Date(bill.createdAt),"dd/MM/yyyy")}</td>
                <td>{format(new Date(bill.dueDate),"dd/MM/yyyy")}</td>
                <td>
                  <Badge
                    bg={bill.paymentStatus === "שולם" ? "success" : "danger"}
                    className="fs-6"
                  >
                    {bill.paymentStatus}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="me-md-1 mb-1 mb-md-0"
                    onClick={() => {
                      setDetails(bill);
                      dispatch({ type: "BILLING_DETAILS", payload: true });
                    }}
                  >
                    פרטים
                  </Button>
                  {/* //TODO: Check if status is paid download Receipt, if ot paid download quote */}
                  <Button
                    variant="outline-secondary"
                    className="me-md-1 mb-1 mb-md-0"
                  >
                    הורדה
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* //* Modals */}
      <BillingDetails details={details} />
    </>
  );
}

export default Billing;
