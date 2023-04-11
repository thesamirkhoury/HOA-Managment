import React from "react";

import { useModalsContext } from "../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  const { loading } = useModalsContext();

  return (
    <Modal
      show={loading}
      className="text-center loader-spinner"
      backdrop="static"
      keyboard={false}
      centered={true}
    >
      <Modal.Body>
        <Spinner animation="grow" size="xl" />
      </Modal.Body>
    </Modal>
  );
}

export default Loader;
