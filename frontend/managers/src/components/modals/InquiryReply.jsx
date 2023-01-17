import React, { useState } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InquiryReply() {
  const { inquiryReply, dispatch } = useModalsContext();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Modal
      show={inquiryReply}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "INQUIRY_REPLY", payload: false })}
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

        {/* Inquiry Details */}
        <div>
          <p className="fs-4">פרטי הפנייה</p>
          <p>
            נושא הפנייה: <span>{"דחיית תשלום דמי הועד"}</span>
          </p>
          <p>
            תוכן הפנייה:
            <span> {"האם ניתן לדחות את תשלום הועד לחודש הבא?"}</span>
          </p>
        </div>
        <hr />
        {/* Response */}
        <div>
          <p className="fs-4">התשובה</p>

          <Form>
            <Form.Group>
              <Form.Label>תשובת הוועד</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                type="text"
                placeholder=""
              ></Form.Control>
            </Form.Group>
          </Form>
        </div>
        {/* Buttons */}
        <div className="mt-3 float-end">
          <Button variant="success" type="submit">
            <i className="bi bi-send"> </i>שלח תשובה
          </Button>

          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={() => {
              dispatch({ type: "INQUIRY_REPLY", payload: false });
            }}
          >
            <i className="bi bi-x-square"> </i>סגור חלון
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InquiryReply;
