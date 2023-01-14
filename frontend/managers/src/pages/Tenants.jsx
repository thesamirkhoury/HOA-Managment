import React, { useState } from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewTenant from "../components/modals/NewTenant";
import TenantDetails from "../components/modals/TenantDetails";
import EditTenant from "../components/modals/EditTenant";

function Tenants() {
  const { dispatch } = useModalsContext();
  const [tenantData, setTenantData] = useState();

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">ניהול דיירים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2">
        <Col xs={6} md={6} lg={8} xxl={15}>
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
              dispatch({ type: "NEW_TENANT", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>דייר חדש
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover>
        <thead className="text-center">
          <tr>
            <th>שם דייר</th>
            <th>מספר בניין</th>
            <th>מספר בית</th>
            <th>סוג דירה</th>
            <th>טלפון</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>ישראל ישראלי</td>
            <td>1</td>
            <td>2</td>
            <td>שכירות</td>
            <td>
              <a href="tel:+9720521234567" className="text-decoration-none">
                0521234567
              </a>
            </td>
            <td>
              <Button
                variant="outline-primary"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {
                  setTenantData({
                    firstName: "ישראל",
                    lastName: "ישראלי",
                    tenantType: "שכירות",
                    parkingSpot: "2",
                  });
                  dispatch({ type: "TENANT_DETAILS", payload: true });
                }}
              >
                פרטיים
              </Button>
              <Button variant="outline-danger">מחק</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* //* Modals */}
      <NewTenant />
      <TenantDetails tenantData={tenantData} />
      <EditTenant/>
    </>
  );
}

export default Tenants;
