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
import MaintenanceManagement from "../components/modals/MaintenanceDetails";
import MaintenanceImages from "../components/modals/MaintenanceImages";
import ForwardMaintenance from "../components/modals/ForwardMaintenance";

function Maintenance() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { tenants, suppliers, maintenance } = useDataContext();
  const [searchOpen, setSearchOpen] = useState("");
  const [searchClosed, setSearchClosed] = useState("");
  const [requestData, setRequestData] = useState();
  const [imageUrl, setImageUrl] = useState("");

  function getTenant(id) {
    if (tenants) {
      let tenant = tenants.find((t) => t._id === id);
      if (!tenant) {
        return { firstName: "הדייר נמחק מהמערכת", lastName: "" };
      }
      return tenant;
    }
  }

  // fetch requests data
  useEffect(() => {
    if (!tenants) {
      fetchData("tenants", "SET_TENANTS");
    }
    if (!suppliers) {
      fetchData("suppliers", "SET_SUPPLIERS");
    }
    if (!maintenance) {
      fetchData("maintenance", "SET_MAINTENANCE");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - קריאות שירות</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">קריאות שירות</h1>
      {/* Open Requests */}
      <h1 className="display-3">קריאות פתוחות</h1>
      {/*Opened Requests - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש קריאות פתוחות..."
              className="ms-3 ms-md-3"
              value={searchOpen}
              onChange={(e) => {
                setSearchOpen(e.target.value);
              }}
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              fetchData("maintenance", "SET_MAINTENANCE");
            }}
          >
            <i className="bi bi-arrow-repeat"> </i>רענן מידע
          </Button>
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
            maintenance
              // map over each inquiry and add the tenant details
              .map((request) => {
                if (tenants && maintenance) {
                  let tenant = getTenant(request.tenant_id);
                  return {
                    ...tenant,
                    ...request,
                  };
                } else {
                  return null;
                }
              })
              .filter((item) => {
                if (item) {
                  let fullName = `${item.firstName} ${item.lastName}`;
                  //Search Logic
                  return searchOpen.toLowerCase() === ""
                    ? item.status === "פתוח" || item.status === "בטיפול"
                    : (fullName
                        .toLowerCase()
                        .includes(searchOpen.toLowerCase()) ||
                        item.subject
                          .toLowerCase()
                          .includes(searchOpen.toLowerCase()) ||
                        format(
                          new Date(item.createdAt),
                          "dd/MM/yyyy HH:mm"
                        ).includes(searchOpen)) &&
                        (item.status === "פתוח" || item.status === "בטיפול");
                } else {
                  return null;
                }
              })
              .map((request) => (
                <tr key={request._id}>
                  <td>{`${request.firstName} ${request.lastName}`}</td>
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
                        setRequestData(request);
                        setImageUrl(request.picturePath);
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
              ))}
        </tbody>
      </Table>
      {/* Closed Requests */}
      <h1 className="display-3">קריאות סגורות</h1>
      {/*Closed Requests - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש קריאות סגורות..."
              className="ms-3 ms-md-3"
              value={searchClosed}
              onChange={(e) => {
                setSearchClosed(e.target.value);
              }}
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              fetchData("maintenance", "SET_MAINTENANCE");
            }}
          >
            <i className="bi bi-arrow-repeat"> </i>רענן מידע
          </Button>
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
            maintenance
              // map over each inquiry and add the tenant details
              .map((request) => {
                if (tenants && maintenance) {
                  let tenant = getTenant(request.tenant_id);
                  return {
                    ...tenant,
                    ...request,
                  };
                } else {
                  return null;
                }
              })
              .filter((item) => {
                if (item) {
                  let fullName = `${item.firstName} ${item.lastName}`;
                  //Search Logic
                  return searchClosed.toLowerCase() === ""
                    ? item.status === "סגור"
                    : (fullName
                        .toLowerCase()
                        .includes(searchClosed.toLowerCase()) ||
                        item.subject
                          .toLowerCase()
                          .includes(searchClosed.toLowerCase()) ||
                        format(
                          new Date(item.updatedAt),
                          "dd/MM/yyyy HH:mm"
                        ).includes(searchClosed)) &&
                        item.status === "סגור";
                } else {
                  return null;
                }
              })
              .map((request) => (
                <tr key={request._id}>
                  <td>{`${request.firstName} ${request.lastName}`}</td>
                  <td>{request.subject}</td>
                  <td>
                    {format(new Date(request.updatedAt), "HH:mm dd/MM/yyyy")}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="me-md-1 mb-1 mb-md-0"
                      onClick={() => {
                        setRequestData(request);
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
              ))}
        </tbody>
      </Table>
      {/* //* Modals */}
      <MaintenanceManagement requestData={requestData} />
      <MaintenanceImages url={imageUrl} />
      <ForwardMaintenance suppliers={suppliers} requestData={requestData} />
    </>
  );
}

export default Maintenance;
