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

function NewTenant() {
  const { newTenant, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [parkingSpot, setParkingSpot] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isOwner, setIsOwner] = useState(true);
  //error handling
  const [error, setError] = useState(null);

  function handleHide() {
    dispatch({ type: "NEW_TENANT", payload: false });
    //reset the input fields
    setFirstName("");
    setLastName("");
    setBuildingNumber("");
    setApartmentNumber("");
    setParkingSpot("");
    setPhoneNumber("");
    setTenantEmail("");
    setOwnerFirstName("");
    setOwnerLastName("");
    setOwnerPhoneNumber("");
    setOwnerEmail("");
    setIsOwner(true);
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const tenant = {
      firstName,
      lastName,
      buildingNumber,
      apartmentNumber,
      parkingSpot,
      phoneNumber,
      tenantEmail,
      tenantType: `${isOwner ? "בעל בית" : "שוכר"}`,
      ownerFirstName: `${isOwner ? firstName : ownerFirstName}`,
      ownerLastName: `${isOwner ? lastName : ownerLastName}`,
      ownerPhoneNumber: `${isOwner ? phoneNumber : ownerPhoneNumber}`,
      ownerEmail: `${isOwner ? tenantEmail : ownerEmail}`,
    };

    const errors = await sendData(
      "tenants/signup",
      "POST",
      tenant,
      "NEW_TENANT"
    );
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
    }
  }

  return (
    <Modal show={newTenant} fullscreen="lg-down" size="lg" onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>הוספת דייר חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>שם פרטי</Form.Label>
              <Form.Control
                required
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>שם משפחה</Form.Label>
              <Form.Control
                required
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>מספר בניין</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="numeric"
                min="1"
                value={buildingNumber}
                onChange={(e) => {
                  setBuildingNumber(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>מספר דירה</Form.Label>
              <Form.Control
                required
                type="number"
                inputMode="numeric"
                min="1"
                value={apartmentNumber}
                onChange={(e) => {
                  setApartmentNumber(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>מספר חניה</Form.Label>
              <Form.Control
                type="number"
                inputMode="numeric"
                min="1"
                placeholder="שדה לא חובה"
                value={parkingSpot}
                onChange={(e) => {
                  setParkingSpot(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control
                required
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>מייל</Form.Label>
              <Form.Control
                required
                type="email"
                value={tenantEmail}
                onChange={(e) => {
                  setTenantEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="ms-2 mb-3">
            <Form.Check
              type="checkbox"
              label="הדייר הינו שוכר"
              id="isOwnerCheckBox"
              checked={!isOwner}
              onChange={() => {
                setIsOwner(!isOwner);
              }}
            />
          </Row>
          {!isOwner && (
            <>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>שם פרטי של בעל הדירה</Form.Label>
                  <Form.Control
                    required={!isOwner}
                    type="text"
                    value={ownerFirstName}
                    onChange={(e) => {
                      setOwnerFirstName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>שם משפחה של בעל הדירה</Form.Label>
                  <Form.Control
                    required={!isOwner}
                    type="text"
                    value={ownerLastName}
                    onChange={(e) => {
                      setOwnerLastName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>מספר טלפון של בעל הדירה</Form.Label>
                  <Form.Control
                    required={!isOwner}
                    type="tel"
                    value={ownerPhoneNumber}
                    onChange={(e) => {
                      setOwnerPhoneNumber(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>מייל בעל הדירה</Form.Label>
                  <Form.Control
                    required={!isOwner}
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => {
                      setOwnerEmail(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Row>
            </>
          )}
          {error && <div className="error">{error}</div>}
          <div className="mt-3 float-end">
            <Button variant="success" type="submit">
              <i className="bi bi-plus-square"> </i>הוספת דייר
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

export default NewTenant;
