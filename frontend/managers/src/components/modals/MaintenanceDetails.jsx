import React, { useState } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MaintenanceDetails() {
  const { maintenanceView, dispatch } = useModalsContext();
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Modal
      show={maintenanceView}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "MAINTENANCE_VIEW", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי קריאת השירות</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Tenant Details */}
        <div>
          <p className="fs-4">פרטי הדייר</p>
          <p>
            שם הדייר: <span>{"ישראל ישראלי"}</span>
          </p>
          {/* Extra tenant Details - API Call */}
          <div className={`${showDetails ? "d-block" : "d-none"}`}>
            <Row>
              <Col sm="6">
                <p>
                  מספר בניין: <span>{"1"}</span>
                </p>
              </Col>
              <Col sm="6">
                <p>
                  מספר בית: <span>{"2"}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <p>
                  מספר טלפון:{" "}
                  <a href="tel:+9720521234567" className="text-decoration-none">
                    {"0521234567"}
                  </a>
                </p>
              </Col>
              <Col sm="6">
                <p>
                  מייל:{" "}
                  <a
                    href="mailto:israel@gmail.com"
                    className="text-decoration-none"
                  >
                    {"israel@gmail.com"}
                  </a>
                </p>
              </Col>
            </Row>
          </div>
          <Button
            variant="outline-primary"
            className={`ms-2 col-12 ${showDetails ? "d-none" : "d-block"}`}
            onClick={() => {
              // API CALL
              setShowDetails(true);
            }}
          >
            <i className="bi bi-file-person"> </i> הצג פרטי הדייר המלאים
          </Button>
        </div>
        <hr />
        {/* Request Details */}
        <div>
          <p className="fs-4">פרטי קריאת השירות</p>
          <p>
            נושא קריאת השירות: <span>{"החלפת נורות במעלית"}</span>
          </p>
          <p>
            תוכן קריאת השירות:
            <span> {"החלפת נורות במעלית"}</span>
          </p>
          <p>תיעוד:</p>
          <p>
            תאריך פתיחת קריאת השירות:
            <span> {"1/1/2023"}</span>
          </p>
          <p>
            תאריך סגירת קריאת השירות:
            <span> {"1/1/2023"}</span>
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-3 float-end">
          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={() => {
              dispatch({ type: "MAINTENANCE_VIEW", payload: false });
            }}
          >
            <i className="bi bi-x-square"> </i>סגור חלון
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MaintenanceDetails;
