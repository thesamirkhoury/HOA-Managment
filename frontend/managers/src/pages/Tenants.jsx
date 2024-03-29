import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
  const { dispatch } = useModalsContext();
  const { tenants, details } = useDataContext();
  const { fetchData } = useDataHandler();
  const [search, setSearch] = useState("");
  const [buildingsCount, setBuildingsCount] = useState();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  // fetch tenants data
  useEffect(() => {
    if (!tenants) {
      fetchData("tenants", "SET_TENANTS");
    }
    if (!details) {
      fetchData("details", "SET_DETAILS");
    }
    if (details) {
      setBuildingsCount(details.buildingCount);
    }
  }, [details]); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - ניהול דיירים</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">ניהול דיירים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
        <Col xs={6} md={6} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש דיירים..."
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
              dispatch({ type: "NEW_TENANT", payload: true });
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
            tenants
              .filter((item) => {
                let fullName = `${item.firstName} ${item.lastName}`;
                //Search Logic
                return search.toLowerCase() === ""
                  ? item
                  : fullName.toLowerCase().includes(search.toLowerCase()) ||
                      item.buildingNumber.includes(search) ||
                      item.apartmentNumber.includes(search) ||
                      item.tenantType
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      item.phoneNumber.includes(search);
              })
              .map((tenant) => (
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
                      className="me-md-1 mb-1 mb-sm-0 me-sm-1"
                      onClick={() => {
                        setEditData(tenant);
                        dispatch({ type: "EDIT_TENANT", payload: true });
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
      <NewTenant buildingsCount={buildingsCount} />
      <EditTenant editData={editData} buildingsCount={buildingsCount} />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Tenants;
