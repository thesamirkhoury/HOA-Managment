import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";
//helper functions
import format from "date-fns/format";
import { download } from "../util/fileDownload";

//bootstrap components
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Documents() {
  const { fetchData, fetchFile } = useDataHandler();
  const [search, setSearch] = useState("");
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
      <h1 className="display-1">מרכז שיתוף מסמכים</h1>
      {/* Search Bar */}
      <Row className="ms-md-2 mb-2">
        <Col xs={7} md={8} lg={8}>
          <Form>
            <Form.Control
              type="search"
              placeholder="חפש מסמך..."
              className="ms-3 ms-md-3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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
            documents
              .filter((item) => {
                //Search Logic
                return search.toLowerCase() === ""
                  ? item
                  : item.fileName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                      item.fileDescription
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      format(new Date(item.createdAt), "dd/MM/yyyy").includes(
                        search
                      );
              })
              .map((document) => (
                <tr key={document._id}>
                  <td>{document.fileName}</td>
                  <td>{document.fileDescription}</td>
                  <td>{format(new Date(document.createdAt), "dd/MM/yyyy")}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={async () => {
                        const response = await fetchFile(
                          `documents/download/${document._id}`
                        );
                        download(response, document.fileName);
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
