import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";
//helper functions
import format from "date-fns/format";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecordPayment({ editData }) {
  const { recordPayment, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();

  // disable fields, depending on payment status
  const [isPaid, setIsPaid] = useState(false);
  // Payment Type Selector
  const [methodSelector, setMethodSelector] = useState("");
  //form state
  const [cashInput, setCashInput] = useState(0);
  const [issuer, setIssuer] = useState("");
  const [lastDigits, setLastDigits] = useState("");
  const [exp, setExp] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [approvalNumber, setApprovalNumber] = useState("");
  //error handling
  const [error, setError] = useState(null);
  //Payment object
  const [paymentRecord, setPaymentRecord] = useState("");

  function updatePaymentRecord(newObj) {
    setPaymentRecord((prev) => ({
      ...prev,
      ...newObj,
    }));
  }

  function clearFormState() {
    // clear the record object
    setPaymentRecord({ paymentMethod: "" });
    // clear the disabled state
    setIsPaid(false);
    // clear the form state
    setMethodSelector("");
    setCashInput("");
    setIssuer("");
    setLastDigits("");
    setExp("");
    setBankName("");
    setBranchNumber("");
    setAccountNumber("");
    setCheckNumber("");
    setApprovalNumber("");
  }

  function handleHide() {
    dispatch({ type: "PAYMENT_RECORD", payload: false });
    //error handling
    setError(null);
  }

  async function handlePayment(e) {
    e.preventDefault();

    //send the request
    if (paymentRecord) {
      const errors = await sendData(
        `billing/${editData._id}/payment`,
        "POST",
        paymentRecord,
        "EDIT_BILLING"
      );
      if (!errors) {
        handleHide();
      }
      if (errors) {
        setError(errors.error);
      }
    }
  }

  useEffect(() => {
    if (editData && editData.paymentDetails) {
      setMethodSelector(editData.paymentDetails.paymentMethod);
      //set disable bool
      setIsPaid(true);
      //set data
      setCashInput(editData.paymentDetails.paidAmount);
      setIssuer(editData.paymentDetails.issuer);
      setLastDigits(editData.paymentDetails.lastDigits);
      setExp(editData.paymentDetails.EXP);
      setBankName(editData.paymentDetails.bankName);
      setBranchNumber(editData.paymentDetails.branchNumber);
      setAccountNumber(editData.paymentDetails.accountNumber);
      setCheckNumber(editData.paymentDetails.checkNumber);
      setApprovalNumber(editData.paymentDetails.approvalNumber);
    } else {
      clearFormState();
    }
  }, [editData]);

  return (
    <Modal
      show={recordPayment}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת תיעוד תשלום</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Invoice Details */}
        {editData && (
          <Card>
            <Card.Header className="fs-4">פרטי דרישת התשלום</Card.Header>
            {/* Card Body */}
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>שם הדייר</Form.Label>
                  <Form.Control
                    disabled
                    defaultValue={`${editData.firstName} ${editData.lastName}`}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>סכום</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={editData.amount}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>לתשלום עד</Form.Label>
                      <Form.Control
                        disabled
                        defaultValue={editData.dueDate.split("T")[0]}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>תיאור</Form.Label>
                  <Form.Control
                    disabled
                    as="textarea"
                    rows={3}
                    defaultValue={editData.description}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}

        <hr />

        {/* Payment Details */}
        <div className="mb-2">
          <Form.Group>
            <Form.Label>סוג אמצעי התשלום</Form.Label>
            <Form.Select
              aria-label="Payment type select"
              disabled={isPaid}
              value={methodSelector}
              onChange={(e) => {
                setMethodSelector(e.target.value);
                setPaymentRecord({
                  paymentMethod: e.target.value,
                  paymentDate: Date.now(),
                });
              }}
            >
              <option>בחר סוג אמצעי התשלום</option>
              <option value="מזומן">מזומן</option>
              <option value="כרטיס אשראי">כרטיס אשראי</option>
              <option value="צק">צ'ק</option>
              <option value="העברה בנקאית">העברה בנקאית</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form onSubmit={handlePayment}>
          {/* Cash Payment */}
          {editData && methodSelector === "מזומן" && (
            <>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>סכום במזומן</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    inputMode="numeric"
                    min="1"
                    disabled={isPaid}
                    value={cashInput}
                    onChange={(e) => {
                      setCashInput(e.target.value);
                      updatePaymentRecord({ paidAmount: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>עודף</Form.Label>
                  <Form.Control
                    disabled
                    dir="ltr"
                    className="text-start"
                    value={cashInput - editData.amount}
                  ></Form.Control>
                </Form.Group>
              </Row>
            </>
          )}

          {/* Card Payment */}
          {methodSelector === "כרטיס אשראי" && (
            <>
              <Row className="mt-1">
                <Form.Group as={Col} md="6">
                  <Form.Label>סוג כרטיס אשראי</Form.Label>
                  <Form.Select
                    aria-label="credit card type selector"
                    disabled={isPaid}
                    value={issuer}
                    onChange={(e) => {
                      setIssuer(e.target.value);
                      updatePaymentRecord({ issuer: e.target.value });
                    }}
                  >
                    <option>בחר סוג כרטיס אשראי</option>
                    <option value="Visa">ויזה - Visa</option>
                    <option value="Mastercard">מאסטר כארד - Master Card</option>
                    <option value="AMEX">אמריקאן אקספרס - AMEX</option>
                    <option value="Debit">חיוב מידי - Debit</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>4 ספרות אחרונות של הכרטיס</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    inputMode="numeric"
                    min="1"
                    disabled={isPaid}
                    value={lastDigits}
                    onChange={(e) => {
                      setLastDigits(e.target.value);
                      updatePaymentRecord({ lastDigits: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="2">
                  <Form.Label>תוקף הכרטיס</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="1"
                    disabled={isPaid}
                    value={exp}
                    onChange={(e) => {
                      setExp(e.target.value);
                      updatePaymentRecord({ EXP: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
              </Row>
            </>
          )}

          {/* Check Payment */}
          {methodSelector === "צק" && (
            <>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>שם הבנק</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    disabled={isPaid}
                    value={bankName}
                    onChange={(e) => {
                      setBankName(e.target.value);
                      updatePaymentRecord({ bankName: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="2">
                  <Form.Label>מספר סניף</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    inputMode="numeric"
                    min="1"
                    disabled={isPaid}
                    value={branchNumber}
                    onChange={(e) => {
                      setBranchNumber(e.target.value);
                      updatePaymentRecord({ branchNumber: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>מספר חשבון</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    inputMode="numeric"
                    min="1"
                    disabled={isPaid}
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                      updatePaymentRecord({ accountNumber: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>מספר צ׳ק</Form.Label>
                <Form.Control
                  required
                  type="number"
                  inputMode="numeric"
                  min="1"
                  disabled={isPaid}
                  value={checkNumber}
                  onChange={(e) => {
                    setCheckNumber(e.target.value);
                    updatePaymentRecord({ checkNumber: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
            </>
          )}

          {/* Bank Transfer Payment */}
          {methodSelector === "העברה בנקאית" && (
            <>
              <Form.Group>
                <Form.Label>מספר אסמכתא</Form.Label>
                <Form.Control
                  required
                  type="number"
                  inputMode="numeric"
                  min="1"
                  disabled={isPaid}
                  value={approvalNumber}
                  onChange={(e) => {
                    setApprovalNumber(e.target.value);
                    updatePaymentRecord({ approvalNumber: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
            </>
          )}

          {editData && editData.paymentDetails && (
            <Form.Group className="mt-2">
              <Form.Label>תאריך תשלום</Form.Label>
              <Form.Control
                disabled
                defaultValue={format(
                  new Date(editData.paymentDetails.paymentDate),
                  "dd/MM/yyyy"
                )}
              ></Form.Control>
            </Form.Group>
          )}

          {error && <div className="error">{error}</div>}

          {/* Buttons */}
          <div className="mt-3 float-end">
            {/* Show Submit button only when a payment option is selected */}
            {methodSelector && !isPaid && (
              <Button variant="success" type="submit">
                <i className="bi bi-plus-square"> </i>הוספת תיעוד
              </Button>
            )}
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

export default RecordPayment;
