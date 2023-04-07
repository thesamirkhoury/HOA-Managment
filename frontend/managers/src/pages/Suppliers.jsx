import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewSupplier from "../components/modals/NewSupplier";
import EditSupplier from "../components/modals/EditSupplier";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Suppliers() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { suppliers } = useDataContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  // fetch suppliers data
  useEffect(() => {
    if (!suppliers) {
      fetchData("suppliers", "SET_SUPPLIERS");
    }
  }, [suppliers, fetchData]);
  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">ניהול ספקים</h1>
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
              dispatch({ type: "NEW_SUPPLIER", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>ספק חדש
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover className="text-center">
        <thead>
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
          {suppliers &&
            suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.supplierCategory}</td>
                <td>{supplier.supplierType}</td>
                <td>
                  <a
                    href={`tel:+972${supplier.phoneNumber}`}
                    className="text-decoration-none"
                  >
                    {supplier.phoneNumber}
                  </a>
                </td>
                <td>
                  <a
                    href={`mailto:${supplier.email}`}
                    className="text-decoration-none"
                  >
                    {supplier.email}
                  </a>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="me-md-1 mb-1 mb-md-0"
                    onClick={() => {
                      setEditData(supplier);
                      dispatch({ type: "EDIT_SUPPLIER", payload: true });
                    }}
                  >
                    עדכן פרטים
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setDeleteData({
                        id: supplier._id,
                        displayName: supplier.supplierName,
                        type: "DELETE_SUPPLIER",
                        suffix: "suppliers",
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
      <NewSupplier />
      <EditSupplier editData={editData} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Suppliers;
