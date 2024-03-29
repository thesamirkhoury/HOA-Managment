import React, { useState, useEffect } from "react";
//custom hooks
import { useModalsContext } from "../../hooks/useModalsContext";
import { useDataHandler } from "../../hooks/useDataHandler";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MaintenanceImages({ url }) {
  const { maintenanceImages, dispatch } = useModalsContext();
  const [imgSrc, setImgSrc] = useState();
  const { fetchFile } = useDataHandler();

  function handleHide() {
    // close the images modal
    dispatch({ type: "MAINTENANCE_IMAGES", payload: false });
  }

  useEffect(() => {
    async function getImage() {
      if (url) {
        const response = await fetchFile(`maintenance/view/${url}`);
        setImgSrc(response);
      }
    }
    getImage();

    //clean up function
    return () => {
      if (imgSrc) {
        // remove the created url after closing the modal
        URL.revokeObjectURL(imgSrc);
        // clean the imgSrc
        setImgSrc();
      }
    };
  }, [url]); //eslint-disable-line

  return (
    <Modal
      show={maintenanceImages}
      fullscreen="lg-down"
      size="lg"
      onHide={handleHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>תיעוד קריאת השירות</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {url ? (
          <img
            src={imgSrc}
            alt="maintenance request documentation"
            className="img-fluid"
          />
        ) : (
          <h1>לא צורף תמונה לקריאה הזאת</h1>
        )}
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
