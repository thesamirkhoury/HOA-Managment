import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ChangePassword() {
  const { changePassword, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "CHANGE_PASSWORD", payload: false });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("הסיסמה והאימות אינם תואמים אחד את השני, נא לנשות שוב.");
    } else {
      const errors = await sendData(
        "details/change-password",
        "PUT",
        { currentPassword, newPassword },
        "NO_CHANGE"
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
      show={changePassword}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>החלפת סיסמה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePasswordChange}>
          <Form.Group className="mb-2">
            <Form.Label>סיסמה נוחכית</Form.Label>
            <Form.Control
              required
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>סיסמה חדשה</Form.Label>
            <Form.Control
              required
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>אימות סיסמה חדשה</Form.Label>
            <Form.Control
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-check-lg"> </i>עדכן סיסמה
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

export default ChangePassword;
