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
import NewDocument from "../components/modals/NewDocument";
import EditDocument from "../components/modals/EditDocument";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";

function Documents() {
  const { dispatch } = useModalsContext();
  const { fetchData } = useDataHandler();
  const { documents } = useDataContext();
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState();

  //fetch documents data
  useEffect(() => {
    if (!documents) {
      fetchData("documents", "SET_DOCUMENTS");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - מרכז שיטוף מסמכים</title>
      </Helmet>
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
          {documents &&
            documents.map((document) => (
              <tr key={document._id}>
                <td>{document.fileName}</td>
                <td>{document.fileDescription}</td>
                <td>{format(new Date(document.createdAt), "dd/MM/yyyy")}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="me-md-1 mb-1 mb-md-0"
                    //TODO: Handle file download
                  >
                    הורדה
                  </Button>

                  <Button
                    variant="outline-warning"
                    className="me-md-1 mb-1 mb-md-0"
                    onClick={() => {
                      setEditData(document);
                      dispatch({ type: "EDIT_DOCUMENT", payload: true });
                    }}
                  >
                    עדכן
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setDeleteData({
                        id: document._id,
                        displayName: document.fileName,
                        type: "DELETE_DOCUMENT",
                        suffix: "documents",
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
      {/* //TODO: Implement New and Edit Documents in File handling Stage */}
      <NewDocument />
      <EditDocument editData={editData} />
      <DeleteConfirmation deleteData={deleteData} /> {/*///? Implemented */}
    </>
  );
}

export default Documents;
