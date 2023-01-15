import React from "react";

//bootstrap components
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
//import Router Nav Link
import { LinkContainer } from "react-router-bootstrap";
// import assets
import Logo from "../assets/LogoBlack.svg";

import { useLocation } from "react-router-dom";

function Sidebar({ show, setShow }) {
  const location = useLocation(); // used to get the current pathname, and highlight it in the Sidebar

  // When clicking on any link scroll to the top of the page.
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

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
          activeKey={location.pathname} // used to highlight current tab in bootstrap primary color.
          className="flex-column ms-1 sidebar"
          variant="pills"
        >
          <br />

          {/* Administrative -  Catagories Title */}
          <Nav.Item>ניהול מנהלי</Nav.Item>
          {/* Category links */}
          <LinkContainer to="/tenants" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-buildings-fill me-1"></i>
              ניהול דיירים
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/suppliers" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-people-fill me-1"></i>
              ניהול ספקים
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/reminders" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-alarm-fill me-1"></i>
              תזכורות אחזקה
            </Nav.Link>
          </LinkContainer>
          <hr />

          {/* Communication - Catagories Title */}
          <Nav.Item>תקשורת</Nav.Item>
          {/* Category links */}
          <LinkContainer to="/notifications" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-megaphone-fill me-1"></i>
              הודעות
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/maintenance" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-wrench me-1"></i>
              קריאות שירות
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/inquires" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-chat-left-fill me-1"></i>
              פניות דיירים
            </Nav.Link>
          </LinkContainer>
          <hr />

          {/* Financial - Catagories Title */}
          <Nav.Item>ניהול פיננסי</Nav.Item>
          {/* Category links */}
          <LinkContainer to="/billings" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-cash-stack me-1"></i>
              ניהול חיובים
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/expenses" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-receipt me-1"></i>
              ניהול הוצאות
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/financial" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-bar-chart-line-fill me-1"></i>
              דאשבורד פיננסי
            </Nav.Link>
          </LinkContainer>
          <hr />

          {/* Documents - Catagories Title */}
          <Nav.Item>ניהול מסמכים</Nav.Item>
          {/* Category link */}
          <LinkContainer to="/documents" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-file-earmark-fill me-1"></i>
              מרכז מסמכים
            </Nav.Link>
          </LinkContainer>
          <hr />

          {/* Settings - Catagories Title */}
          <Nav.Item>הגדרות</Nav.Item>
          {/* Category link */}
          <LinkContainer to="/settings" onClick={scrollToTop}>
            <Nav.Link>
              <i className="bi bi-gear-fill me-1"></i>
              הגדרות
            </Nav.Link>
          </LinkContainer>
          <Button
            variant="outline-dark"
            className="mt-1"
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
