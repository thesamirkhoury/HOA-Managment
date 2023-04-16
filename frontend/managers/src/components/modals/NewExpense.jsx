import React, { useState } from "react";
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

function NewExpense({ suppliers }) {
  const { newExpense, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [supplierId, setSupplierId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [details, setDetails] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "NEW_EXPENSE", payload: false });
    setSupplierId("");
    setAmount("");
    setPaymentMethod("");
    setDetails("");
    setPaymentType("");
    setPaymentDate("");
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const expense = {
      supplier_id: supplierId,
      amount,
      paymentType,
      paymentMethod,
      details,
      paymentDate,
    };
    const errors = await sendData("expenses", "POST", expense, "NEW_EXPENSE");
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal show={newExpense} fullscreen="lg-down" size="lg" onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>הוספת הוצאה חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>בחר ספק</Form.Label>
            <Form.Select
              required
              aria-label="Supplier selector"
              value={supplierId}
              onChange={(e) => {
                setSupplierId(e.target.value);
              }}
            >
              <option>בחר ספק</option>
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
                aria-label="Payment Method selector"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <option>בחר שיטת תשלום</option>
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
                aria-label="Payment type selector"
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                }}
              >
                <option>בחר סוג תשלום</option>
                <option value="חודשי">חודשי</option>
                <option value="חד פעמי">חד-פעמי</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>תאריך התשלום</Form.Label>
              <Form.Control
                required
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
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>הוספת הוצאה
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "NEW_EXPENSE", payload: false });
              }}
            >
              <i className="bi bi-x-square"> </i>סגור חלון
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewExpense;
