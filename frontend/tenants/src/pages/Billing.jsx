import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState();

  useEffect(() => {
    if (!billings) {
      fetchData("billing", "SET_BILLINGS");
    }
  }, [billings]); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - חיובים וקבלות</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">חיובים וקבלות</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש חיובים..."
              className="ms-3 ms-md-3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            className="ms-4 ms-md-2"
            onClick={() => {
              fetchData("billing", "SET_BILLINGS");
            }}
          >
            <i className="bi bi-arrow-repeat"> </i>רענן מידע
          </Button>
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
            billings
              .filter((item) => {
                //Search Logic
                return search.toLowerCase() === ""
                  ? item
                  : item.paymentType
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                      item.amount.toString().includes(search) ||
                      item.status
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      format(new Date(item.createdAt), "dd/MM/yyyy").includes(
                        search
                      ) ||
                      format(new Date(item.dueDate), "dd/MM/yyyy").includes(
                        search
                      );
              })
              .map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.paymentType}</td>
                  <td>{bill.amount}</td>
                  <td>{format(new Date(bill.createdAt), "dd/MM/yyyy")}</td>
                  <td>{format(new Date(bill.dueDate), "dd/MM/yyyy")}</td>
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
                      className="me-md-1 mb-1 mb-sm-0 me-sm-1"
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
