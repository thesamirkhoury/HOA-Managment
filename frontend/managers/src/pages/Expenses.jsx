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
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewExpense from "../components/modals/NewExpense";
import EditExpense from "../components/modals/EditExpense";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Expenses() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { suppliers, expenses } = useDataContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  function getSupplier(id) {
    if (suppliers) {
      let supplier = suppliers.find((s) => s._id === id);
      if (!supplier) {
        return {
          supplierName: "הספק נמחק מהמערכת",
          supplierCategory: "הספק נמחק מהמערכת",
        };
      }
      return supplier;
    }
  }

  //fetch expenses data
  useEffect(() => {
    if (!suppliers) {
      fetchData("suppliers", "SET_SUPPLIERS");
    }
    if (!expenses) {
      fetchData("expenses", "SET_EXPENSES");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - ניהול הוצאות</title>
      </Helmet>
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
          <Button
            className="ms-4 ms-md-5"
            onClick={() => {
              dispatch({ type: "NEW_EXPENSE", payload: true });
            }}
          >
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
            {/* <th>פירוט</th> */}
            <th>סוג תשלום</th>
            <th>תאריך התשלום</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((expense) => {
              if (suppliers) {
                let supplier = getSupplier(expense.supplier_id);
                return (
                  <tr key={expense._id}>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.supplierCategory}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.paymentType}</td>
                    <td>
                      {format(new Date(expense.paymentDate), "dd/MM/yyyy")}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="me-md-1 mb-1 mb-md-0"
                        onClick={() => {
                          setEditData(expense);
                          dispatch({ type: "EDIT_EXPENSE", payload: true });
                        }}
                      >
                        פרטים ועדכון
                      </Button>

                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setDeleteData({
                            id: expense._id,
                            displayName: "ההוצאה",
                            type: "DELETE_EXPENSE",
                            suffix: "expenses",
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
                );
              } else return null;
            })}
        </tbody>
      </Table>
      {/* //* Modals */}
      <NewExpense suppliers={suppliers} />
      <EditExpense editData={editData} suppliers={suppliers} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Expenses;
