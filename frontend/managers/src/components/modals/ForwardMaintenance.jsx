import React, { useState } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ForwardMaintenance({ suppliers, requestData }) {
  const { forwardMaintenance, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  const [supplierEmail, setSupplierEmail] = useState("");
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    // close the images modal
    dispatch({ type: "FORWARD_MAINTENANCE", payload: false });
    //open back the details model
    dispatch({ type: "MAINTENANCE_DETAILS", payload: true });
    //reset form state
    setSupplierEmail("");
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = await sendData(
      `maintenance/${requestData._id}/forward`,
      "POST",
      { supplierEmail },
      "NO_CHANGE"
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
      show={forwardMaintenance}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>העברת קריאת השירות לספק</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {suppliers && (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>שם ספק</Form.Label>
              <Form.Select
                required
                aria-label="Building Number selector"
                value={supplierEmail}
                onChange={(e) => {
                  setSupplierEmail(e.target.value);
                }}
              >
                <option>בחר ספק</option>
                {suppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier.email}>
                    {supplier.supplierName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {error && <div className="error">{error}</div>}
            <div className="mt-3 float-end">
              <Button variant="success" type="submit">
                <i className="bi bi-send"> </i>שלח מייל
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

export default ForwardMaintenance;
