import React from "react";

//bootstrap components
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

// import assets
import Logo from "../assets/LogoBlack.svg"

import { useLocation } from "react-router-dom";

function Sidebar({show, setShow}) {
  // used to get the current pathname, and highlight it in the Sidebar
  const location = useLocation();

  return (
    <Offcanvas
      show={show}
      onHide={() => {
        setShow(false);
      }}
      backdrop={true}
      responsive="lg"
      placement="start"
    >
      {/* Offcanvas Title */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img src={Logo} alt="logo" width="50" className="logo" />
          {/* בחר */}
        </Offcanvas.Title>
      </Offcanvas.Header>
      {/* Offcanvas body, houses the sideBar to be collapsed on smaller displays */}
      <Offcanvas.Body>
        {/* Sidebar */}
        <Nav
          // used to highlight current tab in bootstrap primary color.
          activeKey={location.pathname}
          className="flex-column ms-1 sidebar"
          variant="pills"
        >
          <br />
          {/* Catagories Title */}
          <Nav.Item>ניהול מנהלי</Nav.Item>
          {/* Category link */}
          <Nav.Link href="/tenants">
            <i className="bi bi-buildings-fill me-1"></i>
            ניהול דיירים
          </Nav.Link>
          <Nav.Link href="/supplier">
            <i className="bi bi-people-fill me-1"></i>
            ניהול ספקים
          </Nav.Link>
          <Nav.Link href="/reminders">
            <i className="bi bi-alarm-fill me-1"></i>
            תזכורות אחזקה
          </Nav.Link>

          <hr />

          {/* Catagories Title */}
          <Nav.Item>תקשורת</Nav.Item>
          {/* Category link */}
          <Nav.Link href="/notifications">
            <i className="bi bi-megaphone-fill me-1"></i>
            הודעות
          </Nav.Link>
          <Nav.Link href="/maintenance">
            <i className="bi bi-wrench me-1"></i>
            קריאות שירות
          </Nav.Link>
          <Nav.Link href="/inquires">
            <i className="bi bi-chat-left-fill me-1"></i>
            פניות דיירים
          </Nav.Link>

          <hr />

          {/* Catagories Title */}
          <Nav.Item>ניהול פיננסי</Nav.Item>
          {/* Category link */}
          <Nav.Link href="/billing">
            <i className="bi bi-cash-stack me-1"></i>
            ניהול חיובים
          </Nav.Link>
          <Nav.Link href="/expenses">
            <i className="bi bi-receipt me-1"></i>
            ניהול הוצאות
          </Nav.Link>
          <Nav.Link href="/financial">
            <i className="bi bi-bar-chart-line-fill me-1"></i>
            דאשבורד פיננסי
          </Nav.Link>

          <hr />

          {/* Catagories Title */}
          <Nav.Item>ניהול מסמכים</Nav.Item>
          {/* Category link */}
          <Nav.Link href="/documents">
            <i className="bi bi-file-earmark-fill me-1"></i>
            מרכז מסמכים
          </Nav.Link>

          <hr />

          {/* Catagories Title */}
          <Nav.Item>הגדרות</Nav.Item>
          {/* Category link */}
          <Nav.Link href="/settings" className="mb-1">
            <i className="bi bi-gear-fill me-1"></i>
            הגדרות
          </Nav.Link>
          <Button
            variant="outline-secondary"
            onClick={() => {
              //TODO: Log out user
            }}
          >
            <i className="bi bi-box-arrow-left me-1"></i>
            התנתק
          </Button>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;