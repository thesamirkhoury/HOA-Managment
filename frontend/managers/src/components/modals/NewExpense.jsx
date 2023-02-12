import React from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NewExpense() {
  const { newExpense, dispatch } = useModalsContext();

  return (
    <Modal
      show={newExpense}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "NEW_EXPENSE", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>הוספת הוצאה חדשה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>בחר ספק</Form.Label>
            <Form.Select
              aria-label="Supplier select"
              onChange={(e) => {
                // console.log(e.target.value);
              }}
            >
              <option>בחר ספק</option>
              {/* //! Place holder data for API Call */}
              <option value="ישראל ישראלי">חברת המעליות בע״מ </option>
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>בחר קטגוריה</Form.Label>
              <Form.Control required type="text" placeholder=""></Form.Control>
            </Form.Group>
            {/* //? Option 2 -- check what fits better. */}
            {/* <Col>
              <Form.Label>בחר קטגוריה</Form.Label>
              <input
                className="form-control"
                type="text"
                list="expense-catagories"
                id="expense-catagories-choice"
                name="expense-catagories-choice"
              ></input>
              <datalist id="expense-catagories">
                <option value="Chocolate" />
                <option value="Coconut" />
                <option value="Mint" />
                <option value="Strawberry" />
                <option value="Vanilla" />
              </datalist>
            </Col> */}
            <Form.Group as={Col} md="6">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="numeric"
                min="1"
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>פירוט ההוצאה</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>סוג התשלום</Form.Label>
              <Form.Select
                aria-label="Payment type select"
                onChange={(e) => {
                  // console.log(e.target.value);
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
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </Row>

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
