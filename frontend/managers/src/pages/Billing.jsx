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
//modals
import NewBill from "../components/modals/NewBill";
import RecordPayment from "../components/modals/RecordPayment";
import EditBill from "../components/modals/EditBill";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Billing() {
  const { dispatch } = useModalsContext();
  const { fetchData, sendData } = useDataHandler();
  const { tenants, billings } = useDataContext();
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  function getTenant(id) {
    if (tenants) {
      let tenant = tenants.find((t) => t._id === id);
      if (!tenant) {
        return { firstName: "הדייר נמחק מהמערכת", lastName: "" };
      }
      return tenant;
    }
  }

  //fetch billings data
  useEffect(() => {
    if (!tenants) {
      fetchData("tenants", "SET_TENANTS");
    }
    if (!billings) {
      fetchData("billing", "SET_BILLINGS");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - ניהול חיובים</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">ניהול חיובים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
        <Col xs={6} md={6} lg={8}>
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
        <Col xs={6} md={4} lg={3}>
          <Button
            className="ms-4 ms-md-5"
            onClick={() => {
              dispatch({ type: "NEW_BILL", payload: true });
            }}
          >
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
          {billings &&
            tenants &&
            billings
              // map over each inquiry and add the tenant details
              .map((bill) => {
                if (tenants && billings) {
                  let tenant = getTenant(bill.tenant_id);
                  return {
                    ...tenant,
                    ...bill,
                  };
                } else {
                  return null;
                }
              })
              .filter((item) => {
                if (item) {
                  let fullName = `${item.firstName} ${item.lastName}`;
                  //Search Logic
                  return search.toLowerCase() === ""
                    ? item
                    : fullName.toLowerCase().includes(search.toLowerCase()) ||
                        item.amount.toString().includes(search) ||
                        format(new Date(item.createdAt), "dd/MM/yyyy").includes(
                          search
                        ) ||
                        format(new Date(item.dueDate), "dd/MM/yyyy").includes(
                          search
                        );
                } else {
                  return null;
                }
              })
              .map((bill) => (
                <tr key={bill._id}>
                  <td>{`${bill.firstName} ${bill.lastName}`}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.paymentType}</td>
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
                      className="me-md-1 mb-1 mb-md-1 me-sm-1 mb-lg-0"
                      onClick={() => {
                        setEditData(bill);
                        dispatch({ type: "PAYMENT_RECORD", payload: true });
                      }}
                    >
                      תיעוד תשלום
                    </Button>

                    <Button
                      variant="outline-secondary"
                      disabled={bill.paymentStatus === "שולם"}
                      className="me-md-1 mb-1 mb-md-0 me-sm-1"
                      onClick={async () => {
                      dispatch({ type: "LOADING", payload: true });
                        await sendData(
                          `billing/${bill._id}/reminder`,
                          "POST",
                          {},
                          "NO_CHANGE"
                        );
                      dispatch({ type: "LOADING", payload: false });

                      }}
                    >
                      שליחת תזכורת
                    </Button>

                    <Button
                      variant="outline-warning"
                      disabled={bill.paymentStatus === "שולם"}
                      className="me-md-1 mb-1 mb-sm-0 me-sm-1"
                      onClick={() => {
                        setEditData(bill);
                        dispatch({ type: "EDIT_BILL", payload: true });
                      }}
                    >
                      עדכון
                    </Button>
                    <Button
                      variant="outline-danger"
                      disabled={bill.paymentStatus === "שולם"}
                      className="mt-md-1 mt-xl-0"
                      onClick={() => {
                        setDeleteData({
                          id: bill._id,
                          displayName: "החיוב",
                          type: "DELETE_BILLING",
                          suffix: "billing",
                        });
                        dispatch({
                          type: "DELETE_CONFIRMATION",
                          payload: true,
                        });
                      }}
                    >
                      מחק
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      {/* //* Modals */}
      <NewBill tenants={tenants} />
      <RecordPayment editData={editData} />
      <EditBill editData={editData} tenants={tenants} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Billing;
