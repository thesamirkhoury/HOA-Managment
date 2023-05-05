import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditSupplier({ editData }) {
  const { editSupplier, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();

  // form state
  const [supplierName, setSupplierName] = useState("");
  const [supplierCategory, setSupplierCategory] = useState("");
  const [supplierType, setSupplierType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  //error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setSupplierName(editData.supplierName);
      setSupplierCategory(editData.supplierCategory);
      setSupplierType(editData.supplierType);
      setPhoneNumber(editData.phoneNumber);
      setEmail(editData.email);
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_SUPPLIER", payload: false });
    setSupplierName(editData.supplierName);
    setSupplierCategory(editData.supplierCategory);
    setSupplierType(editData.supplierType);
    setPhoneNumber(editData.phoneNumber);
    setEmail(editData.email);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();

    const supplier = {
      supplierName,
      supplierType,
      supplierCategory,
      email,
      phoneNumber,
    };

    const errors = await sendData(
      `suppliers/${editData._id}`,
      "PATCH",
      supplier,
      "EDIT_SUPPLIER"
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
      show={editSupplier}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון פרטי ספק</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editData && (
          <Form onSubmit={handleEdit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>שם ספק</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={supplierName}
                  onChange={(e) => {
                    setSupplierName(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>תחום התמחות הספק</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={supplierCategory}
                  onChange={(e) => {
                    setSupplierCategory(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>סוג ספק</Form.Label>
                <Form.Select
                  aria-label="Supplier type select"
                  value={supplierType}
                  onChange={(e) => {
                    setSupplierType(e.target.value);
                  }}
                >
                  <option>בחר סוג</option>
                  <option value="חברה">חברה</option>
                  <option value="ספק פרטי">ספק פרטי</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>מספר טלפון</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="שדה לא חובה"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>מייל</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="שדה לא חובה"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value.toLowerCase());
                  }}
                ></Form.Control>
              </Form.Group>
            </Row>
            {error && <div className="error">{error}</div>}
            <div className="mt-3 float-end">
              <Button variant="success" type="submit">
                <i className="bi bi-pen"> </i>עדכן פרטי ספק
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
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EditSupplier;
