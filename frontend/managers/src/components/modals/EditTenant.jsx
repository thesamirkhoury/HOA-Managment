import React, { useState, useEffect } from "react";

//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useTenantsContext } from "../../hooks/useTenantsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditTenant({ editData }) {
  const { editTenant, dispatch: showModal } = useModalsContext();
  const { dispatch } = useTenantsContext();
  const { user } = useAuthContext();
  const [isEditable, SetIsEditable] = useState(false);
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

  useEffect(() => {
    if (editData) {
      if (editData.tenantType === "בעל בית") {
        setIsOwner(true);
      }
      if (editData.tenantType === "שוכר") {
        setIsOwner(false);
      }

      // setting the useState
      setFirstName(editData.firstName);
      setLastName(editData.lastName);
      setBuildingNumber(editData.buildingNumber);
      setApartmentNumber(editData.apartmentNumber);
      setParkingSpot(editData.parkingSpot);
      setPhoneNumber(editData.phoneNumber);
      setTenantEmail(editData.tenantEmail);
      setOwnerFirstName(editData.ownerFirstName);
      setOwnerLastName(editData.ownerLastName);
      setOwnerPhoneNumber(editData.ownerPhoneNumber);
      setOwnerEmail(editData.ownerEmail);
    }
  }, [editData]);

  function handleHide() {
    showModal({ type: "EDIT_TENANT", payload: false });
    SetIsEditable(false);

    //reset the input fields to default values from props
    setFirstName(editData.firstName);
    setLastName(editData.lastName);
    setBuildingNumber(editData.buildingNumber);
    setApartmentNumber(editData.apartmentNumber);
    setParkingSpot(editData.parkingSpot);
    setPhoneNumber(editData.phoneNumber);
    setTenantEmail(editData.tenantEmail);
    setOwnerFirstName(editData.ownerFirstName);
    setOwnerLastName(editData.ownerLastName);
    setOwnerPhoneNumber(editData.ownerPhoneNumber);
    setOwnerEmail(editData.ownerEmail);
    setIsOwner(true);
    setError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const tenantType = `${isOwner ? "בעל בית" : "שוכר"}`;
    const tenant = {
      firstName,
      lastName,
      buildingNumber,
      apartmentNumber,
      parkingSpot,
      phoneNumber,
      tenantEmail,
      tenantType,
      ownerFirstName,
      ownerLastName,
      ownerPhoneNumber,
      ownerEmail,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/tenants/${editData._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(tenant),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //hide the modal
      handleHide();
      //add the data to the context
      dispatch({ type: "EDIT_TENANT", payload: json });
    }
  }

  return (
    <Modal show={editTenant} fullscreen="lg-down" size="lg" onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>פרטי הדייר</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editData && (
          <Form onSubmit={handleEdit}>
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>מספר חניה</Form.Label>
                <Form.Control
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={parkingSpot}
                  onChange={(e) => {
                    setParkingSpot(e.target.value);
                  }}
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Row className="ms-2 mb-3">
              <Form.Check
                type="checkbox"
                label="הדייר הינו שוכר"
                id="isOwnerCheckBox"
                checked={!isOwner}
                disabled={!isEditable}
                onChange={() => {
                  setIsOwner(!isOwner);
                }}
              />
            </Row>
            <Row className={`mb-3 ${isOwner ? "d-none" : ""}`}>
              <Form.Group as={Col} md="6">
                <Form.Label>שם פרטי של בעל הדירה</Form.Label>
                <Form.Control
                  required={!isOwner}
                  type="text"
                  value={ownerFirstName}
                  onChange={(e) => {
                    setOwnerFirstName(e.target.value);
                  }}
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className={`${isOwner ? "d-none" : ""}`}>
              <Form.Group as={Col} md="6">
                <Form.Label>מספר טלפון של בעל הדירה</Form.Label>
                <Form.Control
                  required={!isOwner}
                  type="tel"
                  value={ownerPhoneNumber}
                  onChange={(e) => {
                    setOwnerPhoneNumber(e.target.value);
                  }}
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  <i className="bi bi-pen"> </i>עדכן פרטי דייר
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

            {/* Edit Confirmation */}
            {isEditable && (
              <div className="mt-3 float-end">
                <Button variant="outline-success" type="submit">
                  עדכן פרטיים
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
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EditTenant;
