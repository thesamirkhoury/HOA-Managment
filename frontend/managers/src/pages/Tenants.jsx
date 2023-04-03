import React, { useState, useEffect } from "react";
import { useModalsContext } from "../hooks/useModalsContext";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTenantsContext } from "../hooks/useTenantsContext";

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
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { tenants, dispatch } = useTenantsContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  // fetch tenants data
  useEffect(() => {
    async function fetchTenants() {
      showModal({ type: "LOADING", payload: true });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/managers/tenants`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TENANTS", payload: json });
        showModal({ type: "LOADING", payload: false });
      }
      if (!response.ok) {
        //if user logs in with illegal or incorrect token
        if (json.error === "Request is not authorized") {
          logout();
          showModal({ type: "LOADING", payload: false });
        }
      }
    }
    fetchTenants();
  }, [dispatch, showModal, user]); //eslint-disable-line

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
                        page: "TENANTS",
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
