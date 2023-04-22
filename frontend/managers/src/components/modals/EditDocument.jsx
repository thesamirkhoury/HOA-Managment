import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditDocument({ editData }) {
  const { editDocument, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();

  // form state
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  //error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setFileName(editData.fileName);
      setFileDescription(editData.fileDescription);
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_DOCUMENT", payload: false });
    setFileName(editData.fileName);
    setFileDescription(editData.fileDescription);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();
    const document = {
      fileName,
      fileDescription,
      extension: editData.fileName.split(".").pop(),
    };
    const errors = await sendData(
      `documents/${editData._id}`,
      "PATCH",
      document,
      "EDIT_DOCUMENT"
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
      show={editDocument}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון פרטי קובץ קיים</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group>
            <Form.Label>שם הקובץ</Form.Label>
            <Form.Control
              required
              type="text"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>תיאור הקובץ</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              value={fileDescription}
              onChange={(e) => {
                setFileDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-pen"> </i>עדכן פרטי הקובץ
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

export default EditDocument;
