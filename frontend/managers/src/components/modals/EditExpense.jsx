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

function EditExpense({ editData, suppliers }) {
  const { editExpense, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  //editable field toggler
  const [isEditable, SetIsEditable] = useState(false);
  // form state
  const [supplierId, setSupplierId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [details, setDetails] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  //error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setSupplierId(editData.supplier_id);
      setAmount(editData.amount);
      setPaymentMethod(editData.paymentMethod);
      setDetails(editData.details);
      setPaymentType(editData.paymentType);
      setPaymentDate(editData.paymentDate.split("T")[0]);
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_EXPENSE", payload: false });
    setSupplierId(editData.supplier_id);
    setAmount(editData.amount);
    setPaymentMethod(editData.paymentMethod);
    setDetails(editData.details);
    setPaymentType(editData.paymentType);
    setPaymentDate(editData.paymentDate.split("T")[0]);
  }

  async function handleEdit(e) {
    e.preventDefault();
    const expense = {
      supplier_id: supplierId,
      amount,
      paymentType,
      paymentMethod,
      details,
      paymentDate,
    };
    const errors = await sendData(
      `expenses/${editData._id}`,
      "PATCH",
      expense,
      "EDIT_EXPENSE"
    );
    if (!errors) {
      handleHide();
      SetIsEditable(false);
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal
      show={editExpense}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>עדכון הוצאה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group>
            <Form.Label>בחר ספק</Form.Label>
            <Form.Select
              required
              disabled={!isEditable}
              aria-label="Supplier selector"
              value={supplierId}
              onChange={(e) => {
                setSupplierId(e.target.value);
              }}
            >
              <option value="">בחר ספק</option>
              {/* Dynamically List All tenants */}
              {suppliers &&
                suppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.supplierName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                required
                disabled={!isEditable}
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
              <Form.Label>שיטת תשלום</Form.Label>
              <Form.Select
                required
                disabled={!isEditable}
                aria-label="Payment Method selector"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <option value="">בחר שיטת תשלום</option>
                <option value="מזומן">מזומן</option>
                <option value="העברה בנקאית">העברה בנקאית</option>
                <option value="אשראי">כרטיס אשראי</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>פירוט ההוצאה</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              disabled={!isEditable}
              type="text"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>סוג התשלום</Form.Label>
              <Form.Select
                required
                disabled={!isEditable}
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
            <Form.Group as={Col} md="6">
              <Form.Label>תאריך התשלום</Form.Label>
              <Form.Control
                required
                disabled={!isEditable}
                type="date"
                dir="ltr"
                value={paymentDate}
                onChange={(e) => {
                  setPaymentDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Row>
          {error && <div className="error">{error}</div>}

          {!isEditable && (
            <div className="mt-3 float-end">
              <Button
                variant="success"
                onClick={() => {
                  SetIsEditable(true);
                }}
              >
                <i className="bi bi-pen"> </i>עדכון פרטי ההוצאה
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={handleHide}
              >
                <i className="bi bi-x-square"> </i>סגור חלון
              </Button>
            </div>
          )}

          {isEditable && (
            <div className="mt-3 float-end">
              <Button variant="outline-success" type="submit">
                עדכן פרטים
              </Button>
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={() => {
                  SetIsEditable(false);
                }}
              >
                בטל
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditExpense;
