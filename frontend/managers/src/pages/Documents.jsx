import React, { useState } from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import NewDocument from "../components/modals/NewDocument";
import EditDocument from "../components/modals/EditDocument";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Documents() {
  const { dispatch } = useModalsContext();
  const [deleteData, setDeleteData] = useState();

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">מרכז שיטוף מסמכים</h1>
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
              dispatch({ type: "NEW_DOCUMENT", payload: true });
            }}
          >
            <i className="bi bi-plus-lg"> </i>קובץ חדש
          </Button>
        </Col>
      </Row>
      {/* Table */}
      <Table responsive hover className="text-center">
        <thead>
          <tr>
            <th>שם קובץ</th>
            <th>תיאור הקובץ</th>
            <th>תאריך העלאת הקובץ</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {/* //! Placeholder text */}
          <tr>
            <td>חוזה אחזקת מעליות</td>
            <td>חוזה מפורט לאחזקת מעליות - שנתי 2023</td>
            <td>1/1/2023</td>
            <td>
              <Button
                variant="outline-warning"
                className="me-md-1 mb-1 mb-md-0"
                onClick={() => {
                  // setEditData({
                  //   subject: "טיפול מעליות",
                  // });
                  dispatch({ type: "EDIT_DOCUMENT", payload: true });
                }}
              >
                עדכן
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => {
                  setDeleteData({
                    id: "1234",
                    displayName: "הקובץ",
                    db: "documents",
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
      <NewDocument />
      <EditDocument />
      <DeleteConfirmation deleteData={deleteData} />
    </>
  );
}

export default Documents;
