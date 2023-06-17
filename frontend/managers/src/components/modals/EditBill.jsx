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

function EditBill({ editData, tenants }) {
  const { editBill, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [tenantId, setTenantId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  //error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setTenantId(editData.tenant_id);
      setAmount(editData.amount);
      setPaymentType(editData.paymentType);
      setDescription(editData.description);
      setDueDate(editData.dueDate.split("T")[0]);
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_BILL", payload: false });
    setTenantId(editData.tenant_id);
    setAmount(editData.amount);
    setPaymentType(editData.paymentType);
    setDescription(editData.description);
    setDueDate(editData.dueDate.split("T")[0]);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();
    const bill = {
      tenant_id: tenantId,
      amount,
      paymentType,
      description,
      dueDate,
    };
    const errors = await sendData(
      `billing/${editData._id}`,
      "PATCH",
      bill,
      "EDIT_BILLING"
    );
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal show={editBill} fullscreen="lg-down" size="lg" onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>עדכון דרישת תשלום</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group>
            <Form.Label>בחר דייר</Form.Label>
            <Form.Select
              required
              aria-label="Tenant Name selector"
              value={tenantId}
              onChange={(e) => {
                setTenantId(e.target.value);
              }}
            >
              <option value="">בחר שם דייר</option>
              {/* Dynamically List All tenants */}
              {tenants &&
                tenants.map((tenant) => (
                  <option
                    key={tenant._id}
                    value={tenant._id}
                  >{`${tenant.firstName} ${tenant.lastName}`}</option>
                ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>סכום נדרש</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="decimal"
                min="1"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>סוג התשלום</Form.Label>
              <Form.Select
                required
                aria-label="Payment type selector"
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                }}
              >
                <option value="">בחר סוג תשלום</option>
                <option value="חודשי">חודשי</option>
                <option value="חד פעמי">חד-פעמי</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>תיאור דרישת התשלום</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>לתשלום עד</Form.Label>
            <Form.Control
              required
              type="date"
              dir="ltr"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-pen"> </i>עדכון דרישת תשלום
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

export default EditBill;
