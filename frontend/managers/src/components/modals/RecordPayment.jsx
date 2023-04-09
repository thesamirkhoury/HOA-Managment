import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecordPayment({ editData, tenantData }) {
  const { recordPayment, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();

  // Payment Type Selector
  // Cash
  const [cash, setCash] = useState(false);
  const [cashInput, setCashInput] = useState(0);
  // Card
  const [card, setCard] = useState(false);
  const [issuer, setIssuer] = useState("");
  const [lastDigits, setLastDigits] = useState("");
  const [EXP, setEXP] = useState("");
  // Check
  const [check, setCheck] = useState(false);
  const [bankName, setBankName] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  // Bank transfer
  const [transfer, setTransfer] = useState(false);
  const [approvalNumber, setApprovalNumber] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function closeAllSections() {
    // Close all sections
    setCash(false);
    setCard(false);
    setCheck(false);
    setTransfer(false);
  }

  function handleHide() {
    dispatch({ type: "PAYMENT_RECORD", payload: false });
    // Close all sections
    closeAllSections();
    // reset form data
    setCashInput("");
    setIssuer("");
    setLastDigits("");
    setEXP("");
    setBankName("");
    setBranchNumber("");
    setAccountNumber("");
    setCheckNumber("");
    setApprovalNumber("");
    //error handling
    setError(null);
  }

  async function handlePayment(e) {
    e.preventDefault();

    let paymentRecord;
    if (cash) {
      paymentRecord = {
        paymentMethod: "Cash",
        paymentDate: Date.now(),
      };
    }
    if (card) {
      paymentRecord = {
        paymentMethod: "Card",
        issuer,
        lastDigits,
        EXP,
        paymentDate: Date.now(),
      };
    }
    if (check) {
      paymentRecord = {
        paymentMethod: "Check",
        bankName,
        branchNumber,
        accountNumber,
        checkNumber,
        paymentDate: Date.now(),
      };
    }
    if (transfer) {
      paymentRecord = {
        paymentMethod: "Transfer",
        approvalNumber,
        paymentDate: Date.now(),
      };
    }
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
        {tenantData && editData && (
          <Card>
            <Card.Header className="fs-4">פרטי דרישת התשלום</Card.Header>
            {/* Card Body */}
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>שם הדייר</Form.Label>
                  <Form.Control
                    disabled
                    defaultValue={`${tenantData.firstName} ${tenantData.lastName}`}
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
              onChange={(e) => {
                const selection = e.target.value;
                closeAllSections();
                if (selection === "מזומן") {
                  setCash(true);
                } else if (selection === "חד פעמי") {
                  setCard(true);
                } else if (selection === "צק") {
                  setCheck(true);
                } else if (selection === "העברה בנקאית") {
                  setTransfer(true);
                }
              }}
            >
              <option>בחר סוג אמצעי התשלום</option>
              <option value="מזומן">מזומן</option>
              <option value="חד פעמי">כרטיס אשראי</option>
              <option value="צק">צ'ק</option>
              <option value="העברה בנקאית">העברה בנקאית</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form onSubmit={handlePayment}>
          {/* Cash Payment */}
          <div className={cash ? "d-block" : "d-none"}>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>סכום במזומן</Form.Label>
                <Form.Control
                  required={cash}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={cashInput}
                  onChange={(e) => {
                    setCashInput(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              {editData && (
                <Form.Group as={Col} md="6">
                  <Form.Label>עודף</Form.Label>
                  <Form.Control
                    disabled
                    dir="ltr"
                    className="text-start"
                    value={cashInput - editData.amount}
                  ></Form.Control>
                </Form.Group>
              )}
            </Row>
          </div>

          {/* Card Payment */}
          <div className={card ? "d-block" : "d-none"}>
            <Row className="mt-1">
              <Form.Group as={Col} md="6">
                <Form.Label>סוג כרטיס אשראי</Form.Label>
                <Form.Select
                  aria-label="credit card type selector"
                  value={issuer}
                  onChange={(e) => {
                    setIssuer(e.target.value);
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
                  required={card}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={lastDigits}
                  onChange={(e) => {
                    setLastDigits(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>תוקף הכרטיס</Form.Label>
                <Form.Control
                  required={card}
                  type="number"
                  min="1"
                  value={EXP}
                  onChange={(e) => {
                    setEXP(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Row>
          </div>

          {/* Check Payment */}
          <div className={check ? "d-block" : "d-none"}>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label>שם הבנק</Form.Label>
                <Form.Control
                  required={check}
                  type="text"
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>מספר סניף</Form.Label>
                <Form.Control
                  required={check}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={branchNumber}
                  onChange={(e) => {
                    setBranchNumber(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>מספר חשבון</Form.Label>
                <Form.Control
                  required={check}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Form.Group>
              <Form.Label>מספר צ׳ק</Form.Label>
              <Form.Control
                required={check}
                type="number"
                inputMode="numeric"
                min="1"
                value={checkNumber}
                onChange={(e) => {
                  setCheckNumber(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </div>

          {/* Bank Transfer Payment */}
          <div className={transfer ? "d-block" : "d-none"}>
            <Form.Group>
              <Form.Label>מספר אסמכתא</Form.Label>
              <Form.Control
                required={transfer}
                type="number"
                inputMode="numeric"
                min="1"
                value={approvalNumber}
                onChange={(e) => {
                  setApprovalNumber(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </div>
          {error && <div className="error">{error}</div>}
          {/* Buttons */}
          <div className="mt-3 float-end">
            {/* Show Submit button only when a payment option is selected */}
            {(cash || card || check || transfer) && (
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
