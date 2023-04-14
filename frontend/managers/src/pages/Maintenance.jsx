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
//modals
import MaintenanceManagement from "../components/modals/MaintenanceDetails";
import MaintenanceImages from "../components/modals/MaintenanceImages";

function Maintenance() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { tenants, maintenance } = useDataContext();
  const [tenantData, setTenantData] = useState();
  const [requestData, setRequestData] = useState();
  const [imageUrl, setImageUrl] = useState("");

  function getTenant(id) {
    if (tenants) {
      let tenant = tenants.find((t) => t._id === id);
      return tenant;
    }
  }

  // fetch requests data
  useEffect(() => {
    if (!tenants) {
      fetchData("tenants", "SET_TENANTS");
    }
    if (!maintenance) {
      fetchData("maintenance", "SET_MAINTENANCE");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">קריאות שירות</h1>

      {/* Open Requests */}
      <h1 className="display-3">קריאות פתוחות</h1>
      {/*Opened Requests - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={12} md={12} lg={10} xxl={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש קריאות פתוחות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
      </Row>
      {/* Open Requests Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>נושא הקריאה</th>
            <th>תאריך הפתיחה</th>
            <th>סטטוס טיפול</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {maintenance &&
            maintenance.map((request) => {
              if (
                tenants &&
                (request.status === "פתוח" || request.status === "בטיפול")
              ) {
                let tenant = getTenant(request.tenant_id);
                return (
                  <tr key={request._id}>
                    <td>{`${tenant.firstName} ${tenant.lastName}`}</td>
                    <td>{request.subject}</td>
                    <td>
                      {format(new Date(request.createdAt), "HH:mm dd/MM/yyyy")}
                    </td>
                    <td>
                      <Badge
                        bg={request.status === "פתוח" ? "danger" : "warning"}
                        className="fs-6"
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="me-md-1 mb-1 mb-md-0"
                        onClick={() => {
                          setTenantData(tenant);
                          setRequestData(request);
                          setImageUrl(
                            "https://codescandy.com/geeks-bootstrap-5/assets/images/placeholder/placeholder-4by3.svg"
                          ); //!placeholder url
                          dispatch({
                            type: "MAINTENANCE_DETAILS",
                            payload: true,
                          });
                        }}
                      >
                        פרטים ולהשיב
                      </Button>
                    </td>
                  </tr>
                );
              } else return null;
            })}
        </tbody>
      </Table>

      {/* Closed Requests */}
      <h1 className="display-3">קריאות סגורות</h1>
      {/*Closed Requests - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={12} md={12} lg={10} xxl={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש קריאות סגורות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
      </Row>

      {/* Closed Inquires Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>נושא הפנייה</th>
            <th>תאריך סגירה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {maintenance &&
            maintenance.map((request) => {
              if (tenants && request.status === "סגור") {
                let tenant = getTenant(request.tenant_id);
                return (
                  <tr key={request._id}>
                    <td>{`${tenant.firstName} ${tenant.lastName}`}</td>
                    <td>{request.subject}</td>
                    <td>
                      {format(new Date(request.updatedAt), "HH:mm dd/MM/yyyy")}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="me-md-1 mb-1 mb-md-0"
                        onClick={() => {
                          setTenantData(tenant);
                          setRequestData(request);
                          setImageUrl(
                            "https://codescandy.com/geeks-bootstrap-5/assets/images/placeholder/placeholder-4by3.svg"
                          ); //!placeholder url
                          dispatch({
                            type: "MAINTENANCE_DETAILS",
                            payload: true,
                          });
                        }}
                      >
                        פרטים
                      </Button>
                    </td>
                  </tr>
                );
              } else return null;
            })}
        </tbody>
      </Table>

      {/* //* Modals */}
      <MaintenanceManagement
        tenantData={tenantData}
        requestData={requestData}
      />
      <MaintenanceImages url={imageUrl} />
    </>
  );
}

export default Maintenance;
