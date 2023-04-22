import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
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

function Documents() {
  const { fetchData, fetchFile } = useDataHandler();
  const { documents } = useDataContext();

  useEffect(() => {
    if (!documents) {
      fetchData("documents", "SET_DOCUMENTS");
    }
  }, []); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - מרכז מסמכים</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">מרכז שיטוף מסמכים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש..."
              className="ms-3 ms-md-3"
            ></Form.Control>
          </Form>
        </Col>
        <Col xs={5} md={4} lg={3}>
          <Button
            variant="outline-secondary"
            className="ms-4 ms-md-2"
            onClick={() => {
              fetchData("documents", "SET_DOCUMENTS");
            }}
          >
            <i className="bi bi-arrow-repeat"> </i>רענן מידע
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
                    onClick={async () => {
                      await fetchFile(
                        `documents/download/${document._id}`,
                        document.fileName
                      );
                    }}
                  >
                    הורדה
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default Documents;
