import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useModalsContext } from "../hooks/useModalsContext";
import { useDataHandler } from "../hooks/useDataHandler";
import { useDataContext } from "../hooks/useDataContext";

//bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import ChangeEmail from "../components/modals/ChangeEmail";
import ChangePassword from "../components/modals/ChangePassword";
import CloseAccount from "../components/modals/CloseAccount";

function Settings() {
  const { dispatch } = useModalsContext();
  const { details } = useDataContext();
  const { fetchData, sendData } = useDataHandler();
  //Edit toggles
  const [isEditableHOA, SetIsEditableHOA] = useState(false);
  const [isEditablePersonal, SetIsEditablePersonal] = useState(false);
  // form state
  //hoa details
  const [address, setAddress] = useState("");
  const [buildingCount, setBuildingCount] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [feeType, setFeeType] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [block, setBlock] = useState("");
  const [parcel, setParcel] = useState("");
  //personal details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  //error handling
  const [errorHoa, setErrorHoa] = useState(null);
  const [errorPersonal, setErrorPersonal] = useState(null);

  async function editHoa(e) {
    e.preventDefault();
    const hoa = {
      address,
      buildingCount,
      membersMonthlyFee: monthlyFee,
      feeType,
      fileNumber,
      block,
      parcel,
    };
    const errors = await sendData("details", "PATCH", hoa, "SET_DETAILS");
    if (!errors) {
      SetIsEditableHOA(false);
    }
    if (errors) {
      setErrorHoa(errors.error);
    }
  }

  async function editPersonal(e) {
    e.preventDefault();
    const personal = {
      firstName,
      lastName,
      phoneNumber,
      email,
    };
    const errors = await sendData("details", "PATCH", personal, "SET_DETAILS");
    if (!errors) {
      SetIsEditablePersonal(false);
    }
    if (errors) {
      setErrorPersonal(errors.error);
    }
  }

  useEffect(() => {
    //fetch hoa data
    if (!details) {
      fetchData("details", "SET_DETAILS");
    }

    // set data
    if (details) {
      // Hoa Details
      setAddress(details.address);
      setBuildingCount(details.buildingCount);
      setMonthlyFee(details.membersMonthlyFee);
      setFeeType(details.feeType);
      setFileNumber(details.fileNumber);
      setBlock(details.block);
      setParcel(details.parcel)
      // Personal Details
      setFirstName(details.firstName);
      setLastName(details.lastName);
      setPhoneNumber(details.phoneNumber);
      setEmail(details.email);
    }
  }, [details]); //eslint-disable-line

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - הגדרות</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">הגדרות</h1>

      {/* HOA Details */}
      <Card>
        <Card.Header className="fs-3">פרטי הוועד</Card.Header>
        {/* Card Body */}
        <Card.Body>
          {details && (
            <Form className="m-2" onSubmit={editHoa}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="fs-5">כתובת</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      disabled={!isEditableHOA}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fs-5">מספר בניינים</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={buildingCount}
                      onChange={(e) => {
                        setBuildingCount(e.target.value);
                      }}
                      disabled={!isEditableHOA}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fs-5">מספר תיק</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={fileNumber}
                      onChange={(e) => {
                        setFileNumber(e.target.value);
                      }}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-2">
                  <Form.Group>
                    <Form.Label>גוש</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={block}
                      onChange={(e) => {
                        setBlock(e.target.value);
                      }}
                      disabled={!isEditableHOA}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-2">
                  <Form.Group>
                    <Form.Label>חלקה</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={parcel}
                      onChange={(e) => {
                        setParcel(e.target.value);
                      }}
                      disabled={!isEditableHOA}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fs-5">דמי ועד חודשיים</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      inputMode="decimal"
                      min="1"
                      value={monthlyFee}
                      onChange={(e) => {
                        setMonthlyFee(e.target.value);
                      }}
                      disabled={!isEditableHOA}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col className="mb-2">
                  <Form.Group>
                    <Form.Label className="fs-5">סוג דמי ועד</Form.Label>
                    <Form.Select
                      required
                      aria-label="Monthly Fee Type selector"
                      value={feeType}
                      onChange={(e) => {
                        setFeeType(e.target.value);
                      }}
                      disabled={!isEditableHOA}
                    >
                      <option value="">בחר סוג דמי הועד</option>
                      <option value="קבוע">קבוע</option>
                      <option value="לפי מטר רבוע">לפי מטר רבוע</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <hr />
              {errorHoa && <div className="error">{errorHoa}</div>}
              {/* Edit data */}
              {!isEditableHOA && (
                <Row className="mt-2">
                  <Col>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => {
                        SetIsEditableHOA(true);
                      }}
                    >
                      עדכון פרטים
                    </Button>
                  </Col>
                </Row>
              )}

              {/* Edit Confirmation */}
              {isEditableHOA && (
                <div className="mt-3 float-end">
                  <Button variant="outline-success" type="submit">
                    עדכון פרטים
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => {
                      SetIsEditableHOA(false);
                    }}
                  >
                    בטל
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>

      {/* Personal Data */}
      <Card className="mt-2">
        <Card.Header className="fs-3">פרטים אישיים</Card.Header>
        {/* Card Body */}
        <Card.Body>
          {details && (
            <Form className="m-2" onSubmit={editPersonal}>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fs-5">שם פרטי</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      disabled={!isEditablePersonal}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fs-5">שם משפחה</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      disabled={!isEditablePersonal}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <hr />
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fs-5">מספר טלפון</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      disabled={!isEditablePersonal}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label className="fs-5">מייל</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              {errorPersonal && <div className="error">{errorPersonal}</div>}
              {/* Edit data, Password & Email reset */}
              {!isEditablePersonal && (
                <Row className="mt-2">
                  <Col>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => {
                        SetIsEditablePersonal(true);
                      }}
                    >
                      עדכון פרטים
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => {
                        dispatch({ type: "CHANGE_EMAIL", payload: true });
                      }}
                    >
                      החלפת מייל
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => {
                        dispatch({ type: "CHANGE_PASSWORD", payload: true });
                      }}
                    >
                      החלפת סיסמה
                    </Button>
                  </Col>
                </Row>
              )}

              {/* Edit Confirmation */}
              {isEditablePersonal && (
                <div className="mt-3 float-end">
                  <Button variant="outline-success" type="submit">
                    עדכון פרטים
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => {
                      SetIsEditablePersonal(false);
                    }}
                  >
                    בטל
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>

      {/* Close Account */}
      <Card className="mt-2">
        <Card.Header className="fs-3">סגירת חשבון</Card.Header>
        {/* Card Body */}
        <Card.Body className="text-center">
          <Card.Text>לסגור את חשבון הוועד ולמחוק את כל המידע?</Card.Text>
          <Button
            variant="danger"
            className="w-75"
            onClick={() => {
              dispatch({ type: "CLOSE_ACCOUNT", payload: true });
            }}
          >
            לסגירת החשבון
          </Button>
        </Card.Body>
      </Card>
      {/* //* Modals */}
      <ChangeEmail currentMail={email} />
      <ChangePassword />
      <CloseAccount />
    </>
  );
}

export default Settings;
