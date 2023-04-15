import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
import InquiryDetails from "../components/modals/InquiryDetails";

function Inquires() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { tenants, inquires } = useDataContext();
  const [tenantData, setTenantData] = useState();
  const [inquiryData, setInquiryData] = useState();

  function getTenant(id) {
    if (tenants) {
      let tenant = tenants.find((t) => t._id === id);
      if (!tenant) {
        return { firstName: "הדייר נמחק מהמערכת", lastName: "" };
      }
      return tenant;
    }
  }

  // fetch inquires data
  useEffect(() => {
    if (!tenants) {
      fetchData("tenants", "SET_TENANTS");
    }
    if (!inquires) {
      fetchData("inquiries", "SET_INQUIRES");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - פניות דיירים</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">פניות דיירים</h1>

      {/* Open Inquiries */}
      <h1 className="display-3">פניות פתוחות</h1>
      {/*Opened Inquiries - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש פניות פתוחות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              fetchData("inquiries", "SET_INQUIRES");
            }}
          >
            <i className="bi bi-arrow-repeat"> </i>רענן מידע
          </Button>
        </Col>
      </Row>

      {/* Open Inquires Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם דייר</th>
            <th>נושא הפניה</th>
            <th>תאריך הפתיחה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {inquires &&
            inquires.map((inquiry) => {
              if (tenants && inquiry.status === "פתוח") {
                let tenant = getTenant(inquiry.tenant_id);
                return (
                  <tr key={inquiry._id}>
                    <td>{`${tenant.firstName} ${tenant.lastName}`}</td>
                    <td>{inquiry.subject}</td>
                    <td>
                      {format(new Date(inquiry.createdAt), "HH:mm dd/MM/yyyy")}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="me-md-1 mb-1 mb-md-0"
                        onClick={() => {
                          setTenantData(tenant);
                          setInquiryData(inquiry);
                          dispatch({ type: "INQUIRY_DETAILS", payload: true });
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

      {/* Closed Inquiries */}
      <h1 className="display-3">פניות סגורות</h1>
      {/*Closed Inquiries - Search Bar */}
      <Row className="ms-md-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש פניות סגורות..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              fetchData("inquiries", "SET_INQUIRES");
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
            <th>נושא הפניה</th>
            <th>תאריך סגירה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {inquires &&
            inquires.map((inquiry) => {
              if (tenants && inquiry.status === "סגור") {
                let tenant = getTenant(inquiry.tenant_id);
                return (
                  <tr key={inquiry._id}>
                    <td>{`${tenant.firstName} ${tenant.lastName}`}</td>
                    <td>{inquiry.subject}</td>

                    <td>
                      {format(new Date(inquiry.updatedAt), "HH:mm dd/MM/yyyy")}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="me-md-1 mb-1 mb-md-0"
                        onClick={() => {
                          setTenantData(tenant);
                          setInquiryData(inquiry);
                          dispatch({ type: "INQUIRY_DETAILS", payload: true });
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
      <InquiryDetails tenantData={tenantData} inquiryData={inquiryData} />
    </>
  );
}

export default Inquires;
