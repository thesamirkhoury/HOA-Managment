import React, { useState } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InquiryDetails() {
  const { inquiryView, dispatch } = useModalsContext();
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Modal
      show={inquiryView}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "INQUIRY_VIEW", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי הפניה</Modal.Title>
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
        </div>
        <hr />
        {/* Inquiry Details */}
        <div>
          <p className="fs-4">פרטי הפנייה</p>
          <p>
            נושא הפנייה: <span>{"דחיית תשלום דמי הועד"}</span>
          </p>
          <p>
            תוכן הפנייה:{" "}
            <span>{"האם ניתן לדחות את תשלום הועד לחודש הבא?"}</span>
          </p>
        </div>
        <hr />
        {/* Response */}
        <div>
          <p className="fs-4">התשובה</p>
          <p>
            תשובת הוועד: <span>{"אושר באופן חד פעמי."}</span>
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-3 float-end">
          <Button
            variant="outline-primary"
            className="ms-2"
            onClick={() => {
              // API CALL
              setShowDetails(true);
            }}
          >
            <i className="bi bi-file-person"> </i> הצג פרטי הדייר
          </Button>

          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={() => {
              dispatch({ type: "INQUIRY_VIEW", payload: false });
            }}
          >
            <i className="bi bi-x-square"> </i>סגור חלון
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InquiryDetails;
