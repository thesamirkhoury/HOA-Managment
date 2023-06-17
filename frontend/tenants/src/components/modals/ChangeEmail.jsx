import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ChangeEmail({ currentMail }) {
  const { changeEmail, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "CHANGE_EMAIL", payload: false });
    setEmail("");
    setConfirmEmail("");
    setError(null);
  }

  async function handleChangeEmail(e) {
    e.preventDefault();
    if (email !== confirmEmail) {
      setError("המייל לא תואם את המייל שהוזן באימות, נא לנסות שוב.");
    } else {
      const errors = await sendData(
        "details",
        "PATCH",
        { tenantEmail: email },
        "SET_DETAILS"
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
      show={changeEmail}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "CHANGE_EMAIL", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>החלפת מייל</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleChangeEmail}>
          <Form.Group>
            <Form.Label>מייל קיים</Form.Label>
            <Form.Control
              defaultValue={currentMail}
              type="email"
              readOnly
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-1">
            <Form.Label>מייל חדש</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-1">
            <Form.Label>אימות מייל חדש</Form.Label>
            <Form.Control
              required
              type="email"
              value={confirmEmail}
              onChange={(e) => {
                setConfirmEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <h6 className="text-muted mt-4">
            שים לב שבעת החלפת המייל, כל העדכונים יעברו למייל החדש.
            <br />
            שים לב שהחלפת המייל לא תגרום לשינו בשם המשתמש שלך.
          </h6>
          {error && <div className="error">{error}</div>}
          <div className="mt-5 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-check-lg"> </i>עדכון מייל
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                dispatch({ type: "CHANGE_EMAIL", payload: false });
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

export default ChangeEmail;
