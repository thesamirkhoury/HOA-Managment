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
import NewSupplier from "../components/modals/NewSupplier";
import EditSupplier from "../components/modals/EditSupplier";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Suppliers() {
  const { dispatch } = useModalsContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

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
          {/* //! Placeholder text */}
          <tr>
            <td>מעליות בעמ</td>
            <td>מעליות</td>
            <td>חברה</td>
            <td>
              <a href="tel:+9721700123123" className="text-decoration-none">
                1700123123
              </a>
            </td>
            <td>
              <a
                href="mailto:hello@elevetorsil.co.il"
                className="text-decoration-none"
              >
                hello@elevetorsil.co.il
              </a>
            </td>
            <td>
              <Button
                variant="outline-warning"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {
                  setEditData({
                    name: "מעליות",
                  });
                  dispatch({ type: "EDIT_SUPPLIER", payload: true });
                }}
              >
                עדכן פרטים
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => {
                  setDeleteData({
                    id: "1234",
                    displayName: "מעליות בעמ",
                    db: "suppliers",
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
