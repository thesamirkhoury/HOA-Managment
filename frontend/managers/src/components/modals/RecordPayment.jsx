import React, { useState } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecordPayment() {
  const { recordPayment, dispatch } = useModalsContext();
  //   Cash
  const [cash, setCash] = useState(false);
  const [cashInput, setCashInput] = useState(0);

  const [card, setCard] = useState(false);
  const [check, setCheck] = useState(false);
  const [transfer, setTransfer] = useState(false);

  let placeholderAmount = 200;

  function closeAllSections() {
    setCash(false);
    setCard(false);
    setCheck(false);
    setTransfer(false);
  }
  return (
    <Modal
      show={recordPayment}
      fullscreen="lg-down"
      size="lg"
      onHide={() => {
        dispatch({ type: "PAYMENT_RECORD", payload: false });
        closeAllSections();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת תיעוד תשלום</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Invoice Details */}
        <div>
          <p className="fs-4">פרטי דרישת התשלום</p>
          <p>
            שם דייר:<span> {"ישראל ישראלי"}</span>{" "}
          </p>
          <p>
            סכום: <span> {"200"}</span>
          </p>
          <p>
            תיאור: <span> {"דמי ועד הבית החודשי"}</span>
          </p>
          <p>
            לתשלום עד: <span> {"1/1/2023"}</span>
          </p>
        </div>
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

        <Form>
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
                  placeholder=""
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="6">
                {/* //TODO: Round the change to look like XX.XX */}
                <Form.Label>עודף</Form.Label>
                <Form.Control
                  disabled
                  dir="ltr"
                  className="text-start"
                  value={cashInput - placeholderAmount}
                ></Form.Control>
              </Form.Group>
            </Row>
          </div>

          {/* Card Payment */}
          <div className={card ? "d-block" : "d-none"}>
            <Row className="mt-1">
              <Form.Group as={Col} md="6">
                <Form.Label>סוג כרטיס אשראי</Form.Label>
                <Form.Select aria-label="credit card type select">
                  <option>בחר סוג כרטיס אשראי</option>
                  <option value="visa">ויזה - Visa</option>
                  <option value="MasterCard">מאסטר כארד - Master Card</option>
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
                  maxLength="4"
                  placeholder=""
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>תוקף הכרטיס</Form.Label>
                <Form.Control
                  required={card}
                  type="number"
                  min="1"
                  maxLength={4}
                  placeholder=""
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
                  placeholder=""
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>מספר סניף</Form.Label>
                <Form.Control
                  required={check}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  placeholder=""
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>מספר חשבון</Form.Label>
                <Form.Control
                  required={check}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  placeholder=""
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
                placeholder=""
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
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </div>
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>הוספת תיעוד
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "PAYMENT_RECORD", payload: false });
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

export default RecordPayment;
