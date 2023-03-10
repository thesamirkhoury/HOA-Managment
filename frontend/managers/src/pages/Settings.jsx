import React from "react";
import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//modals
import EditPassword from "../components/modals/EditPassword";
function Settings() {
  const { dispatch } = useModalsContext();

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">הגדרות</h1>

      {/* HOA Details */}
      <h1 className="display-3">פרטי הועד והבניין</h1>

      <div>
        <p>
          כתובת הבניין:
          <span>{"יעקוב שרייבום 26, רמת בית הכרם, ירושלים, ישראל."}</span>
        </p>

        <p>
          שם ראש הועד:
          <span>{"ישראל ישראלי"}</span>
        </p>

        <p>
          מספר הבניינים:
          <span>{"3"}</span>
        </p>

        <p>
          דמי הועד החושדיים:
          <span>{"250₪"}</span>
        </p>
      </div>
      <Row xs={7} md={6}>
        <Button variant="outline-info" className="ms-2">
          עדכן פרטים
        </Button>
      </Row>

      {/* Personal Details */}
      <h1 className="display-3">פרטים אישיים</h1>

      <div>
        <p>
          מייל:
          <span>{"demo@demo.com"}</span>
        </p>

        <p>
          מספר טלפון:
          <span>{"0521234567"}</span>
        </p>
      </div>
      <Row xs={7} md={6}>
        <Button variant="info" className="ms-2 mb-2 mb-md-0">
          עדכון פרטיים אישיים
        </Button>
        <Button
          variant="outline-info"
          className="ms-2"
          onClick={() => {
            dispatch({ type: "EDIT_PASSWORD", payload: true });
          }}
        >
          החלפת סיסמה
        </Button>
      </Row>
      {/* //* Modals */}
      <EditPassword />
    </>
  );
}

export default Settings;
