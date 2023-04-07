import React, { useDeferredValue, useState } from "react";

import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MaintenanceImages({ url }) {
  const { maintenanceImages, dispatch } = useModalsContext();

  function handleHide() {
    // close the images modal
    dispatch({ type: "MAINTENANCE_IMAGES", payload: false });
    //open back the details model
    dispatch({ type: "MAINTENANCE_DETAILS", payload: true });
  }
  return (
    <Modal
      show={maintenanceImages}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>תיעוד קריאת שירות</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={url}
          alt="maintenance request documentation image"
          className="img-fluid"
        />
        <Button
          variant="outline-secondary"
          className="mt-3 float-end"
          onClick={handleHide}
        >
          <i className="bi bi-x-square"> </i>סגור חלון
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default MaintenanceImages;
