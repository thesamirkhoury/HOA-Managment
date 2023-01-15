import React from "react";
import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function TenantDetails({ editData }) {
  const { tenantDetails, dispatch } = useModalsContext();
  return (
    <Modal
      show={tenantDetails}
      fullscreen="lg-down"
      size="lg"
      onHide={() => dispatch({ type: "TENANT_DETAILS", payload: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>פרטי הדייר</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            שם פרטי: <span>{editData ? editData.firstName : ""}</span>
          </p>
          <p>
            שם משפחה: <span>{editData ? editData.lastName : ""}</span>
          </p>
          <p>
            סוג דייר:
            <span>{editData ? editData.tenantType : ""}</span>
          </p>
          <br />
          <p>
            מספר בניין:
            <span>{editData ? editData.buildingNumber : ""}</span>
          </p>
          <p>
            מספר דיירה:
            <span>{editData ? editData.apartmentNumber : ""}</span>
          </p>
          <p>
            מספר חנייה:
            <span>{editData ? editData.parkingSpot : ""}</span>
          </p>
          <br />
          <p>
            מספר טלפון:
            <span>
              {editData ? (
                <a
                  href={`tel:+972${editData.tenantPhoneNumber}`}
                  className="text-decoration-none"
                >
                  {editData.tenantPhoneNumber}
                </a>
              ) : (
                ""
              )}
            </span>
          </p>
          <p>
            מייל:
            <span>
              {editData ? (
                <a
                  href={`mailto:${editData.tenantEmail}`}
                  className="text-decoration-none"
                >
                  {editData.tenantEmail}
                </a>
              ) : (
                ""
              )}
            </span>
          </p>
          <br />
          {/* only if the tenant is a renter display the owner's info */}
          {editData
            ? editData.tenantType === "שכירות" && (
                <>
                  <p>
                    שם בעל הבית:
                    <span>
                      {editData
                        ? `${editData.ownerFirstName} ${editData.ownerLastName}`
                        : ""}
                    </span>
                  </p>

                  <p>
                    מספר טלפון בעל הבית:
                    <span>
                      {editData ? (
                        <a
                          href={`tel:+972${editData.ownerPhoneNumber}`}
                          className="text-decoration-none"
                        >
                          {editData.ownerPhoneNumber}
                        </a>
                      ) : (
                        ""
                      )}
                    </span>
                  </p>
                  <p>
                    מייל בעל הבית:
                    <span>
                      {editData ? (
                        <a
                          href={`mailto:${editData.ownerEmail}`}
                          className="text-decoration-none"
                        >
                          {editData.ownerEmail}
                        </a>
                      ) : (
                        ""
                      )}
                    </span>
                  </p>
                </>
              )
            : ""}
        </div>
        <div className="mt-3 float-end">
          <Button
            variant="warning"
            onClick={() => {
              dispatch({ type: "EDIT_TENANT", payload: true });
              dispatch({ type: "TENANT_DETAILS", payload: false });
            }}
          >
            <i className="bi bi-pen"> </i> עדכן פרטי הדייר
          </Button>
          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={() => {
              dispatch({ type: "TENANT_DETAILS", payload: false });
            }}
          >
            <i className="bi bi-x-square"> </i>סגור חלון
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TenantDetails;
