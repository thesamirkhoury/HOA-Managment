import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewDocument() {
  const { newDocument, dispatch } = useModalsContext();
  const { sendFormData } = useDataHandler();
  // edit form toggle
  const [editable, setEditable] = useState(false);
  // form state
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "NEW_DOCUMENT", payload: false });
    setEditable(false);
    setFile({});
    setFileName("");
    setFileDescription("");
    setError(null);
  }

  async function handleUpload(e) {
    e.preventDefault();
    //form data body
    let formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("fileDescription", fileDescription);
    //upload file
    const errors = await sendFormData(
      "documents",
      "POST",
      formData,
      "NEW_DOCUMENT"
    );
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal
      show={newDocument}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>העלאת קובץ חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpload}>
          <Form.Group controlId="formFile">
            <Form.Label>העלאת הקובץ</Form.Label>
            <Form.Control
              type="file"
              required
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
                setEditable(true);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>שם הקובץ</Form.Label>
            <Form.Control
              required
              disabled={!editable}
              type="text"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>תיאור הקובץ</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              disabled={!editable}
              type="text"
              value={fileDescription}
              onChange={(e) => {
                setFileDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>העלאת הקובץ
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={handleHide}
            >
              <i className="bi bi-x-square"> </i>סגור חלון
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewDocument;
