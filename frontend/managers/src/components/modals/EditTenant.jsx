import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";
//helper functions
import { range } from "../../util/range";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditTenant({ editData, buildingsCount }) {
  const { editTenant, dispatch } = useModalsContext();
  const { sendData } = useDataHandler();
  //editable field toggler
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
      // setting the useState
      setFirstName(editData.firstName);
      setLastName(editData.lastName);
      setBuildingNumber(editData.buildingNumber);
      setApartmentNumber(editData.apartmentNumber);
      setParkingSpot(editData.parkingSpot);
      setPhoneNumber(editData.phoneNumber);
      setTenantEmail(editData.tenantEmail);

      // update the owner and renter details
      if (editData.tenantType === "בעל בית") {
        setIsOwner(true);
        setOwnerFirstName("");
        setOwnerLastName("");
        setOwnerPhoneNumber("");
        setOwnerEmail("");
      }
      if (editData.tenantType === "שוכר") {
        setIsOwner(false);
        setOwnerFirstName(editData.ownerFirstName);
        setOwnerLastName(editData.ownerLastName);
        setOwnerPhoneNumber(editData.ownerPhoneNumber);
        setOwnerEmail(editData.ownerEmail);
      }
    }
  }, [editData]);

  function handleHide() {
    dispatch({ type: "EDIT_TENANT", payload: false });
    SetIsEditable(false);
    // setting the useState
    setFirstName(editData.firstName);
    setLastName(editData.lastName);
    setBuildingNumber(editData.buildingNumber);
    setApartmentNumber(editData.apartmentNumber);
    setParkingSpot(editData.parkingSpot);
    setPhoneNumber(editData.phoneNumber);
    setTenantEmail(editData.tenantEmail);
    // update the owner and renter details
    if (editData.tenantType === "בעל בית") {
      setIsOwner(true);
      setOwnerFirstName("");
      setOwnerLastName("");
      setOwnerPhoneNumber("");
      setOwnerEmail("");
    }
    if (editData.tenantType === "שוכר") {
      setIsOwner(false);
      setOwnerFirstName(editData.ownerFirstName);
      setOwnerLastName(editData.ownerLastName);
      setOwnerPhoneNumber(editData.ownerPhoneNumber);
      setOwnerEmail(editData.ownerEmail);
    }
    setError(null);
  }

  async function handleEdit(e) {
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
      `tenants/${editData._id}`,
      "PATCH",
      tenant,
      "EDIT_TENANT"
    );
    if (!errors) {
      handleHide();
    }
    if (errors) {
      setError(errors.error);
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
                <Form.Select
                  required
                  aria-label="Building Number selector"
                  value={buildingNumber}
                  onChange={(e) => {
                    setBuildingNumber(e.target.value);
                  }}
                  disabled={!isEditable}
                >
                  <option value="">בחר מספר בניין</option>
                  {/* Dynamically List All Available Buildings  */}
                  {range(buildingsCount).map((_, number) => (
                    <option value={number + 1} key={number + 1}>
                      {`בניין ${number + 1}`}
                    </option>
                  ))}
                </Form.Select>
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
                  placeholder="שדה לא חובה"
                  value={parkingSpot}
                  onChange={(e) => {
                    setParkingSpot(e.target.value);
                  }}
                  disabled={!isEditable}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
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
              <Form.Group as={Col} md="4">
                <Form.Label>מייל</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={tenantEmail}
                  onChange={(e) => {
                    setTenantEmail(e.target.value.toLowerCase());
                  }}
                  disabled={!isEditable}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>שם משתמש</Form.Label>
                <Form.Control
                  required
                  disabled
                  defaultValue={editData.username}
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
                <Row className="mb-3">
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
                        setOwnerEmail(e.target.value.toLowerCase());
                      }}
                      disabled={!isEditable}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </>
            )}
            {error && <div className="error">{error}</div>}

            {/* Auth Actions buttons */}
            {!isEditable && editData && (
              <Row>
                <Col>
                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={async () => {
                      dispatch({ type: "LOADING", payload: true });
                      await sendData(
                        `tenants/email-username/${editData._id}`,
                        "POST",
                        {},
                        "NO_CHANGE"
                      );
                      dispatch({ type: "LOADING", payload: false });
                    }}
                  >
                    שלח שם המשתמש לדייר
                  </Button>
                </Col>

                <Col xs={5} md={6}>
                  <Button
                    variant="outline-secondary"
                    className="w-100 "
                    onClick={async () => {
                      dispatch({ type: "LOADING", payload: true });
                      await sendData(
                        "reset-tenant-password",
                        "POST",
                        { username: editData.username },
                        "NO_CHANGE"
                      );
                      dispatch({ type: "LOADING", payload: false });
                    }}
                  >
                    אפס סיסמת דייר
                  </Button>
                </Col>
              </Row>
            )}
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
