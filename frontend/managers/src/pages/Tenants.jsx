import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataHandler } from "../hooks/useDataHandler";
import { useDataContext } from "../hooks/useDataContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewTenant from "../components/modals/NewTenant";
import EditTenant from "../components/modals/EditTenant";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Tenants() {
  const { dispatch: showModal } = useModalsContext();
  const { tenants } = useDataContext();
  const { fetchData } = useDataHandler();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  // fetch tenants data
  useEffect(() => {
    if (!tenants) {
      fetchData("tenants", "SET_TENANTS");
    }

  }, [tenants, fetchData]);

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">ניהול דיירים</h1>
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
              showModal({ type: "NEW_TENANT", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>דייר חדש
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>מספר בניין</th>
            <th>מספר דירה</th>
            <th>סוג בעלות</th>
            <th>טלפון</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {tenants &&
            tenants.map((tenant) => (
              <tr key={tenant._id}>
                <td>{`${tenant.firstName} ${tenant.lastName}`}</td>
                <td>{tenant.buildingNumber}</td>
                <td>{tenant.apartmentNumber}</td>
                <td>{tenant.tenantType}</td>
                <td>
                  <a
                    href={`tel:+972${tenant.phoneNumber}`}
                    className="text-decoration-none"
                  >
                    {tenant.phoneNumber}
                  </a>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="me-md-1 mb-1 mb-md-0"
                    onClick={() => {
                      setEditData(tenant);
                      showModal({ type: "EDIT_TENANT", payload: true });
                    }}
                  >
                    פרטים
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setDeleteData({
                        id: tenant._id,
                        displayName: `${tenant.firstName} ${tenant.lastName}`,
                        type: "DELETE_TENANT",
                        suffix: "tenants",
                      });
                      showModal({ type: "DELETE_CONFIRMATION", payload: true });
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
      <NewTenant />
      <EditTenant editData={editData} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Tenants;
