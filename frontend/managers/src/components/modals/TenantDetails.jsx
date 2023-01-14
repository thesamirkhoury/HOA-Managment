import React from "react";
import { useModalsContext } from "../../hooks/useModalsContext";

//bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function TenantDetails({ tenantData }) {
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
            שם פרטי: <span>{tenantData ? tenantData.firstName : ""}</span>
          </p>
          <p>
            שם משפחה: <span>{tenantData ? tenantData.lastName : ""}</span>
          </p>
          <p>
            סוג דייר:
            <span>{tenantData ? tenantData.tenantType : ""}</span>
          </p>
          <br />
          <p>
            מספר בניין:
            <span>{tenantData ? tenantData.buildingNumber : ""}</span>
          </p>
          <p>
            מספר דיירה:
            <span>{tenantData ? tenantData.apartmentNumber : ""}</span>
          </p>
          <p>
            מספר חנייה:
            <span>{tenantData ? tenantData.parkingSpot : ""}</span>
          </p>
          <br />
          <p>
            מספר טלפון:
            <span>
              {tenantData ? (
                <a
                  href={`tel:+972${tenantData.tenantPhoneNumber}`}
                  className="text-decoration-none"
                >
                  {tenantData.tenantPhoneNumber}
                </a>
              ) : (
                ""
              )}
            </span>
          </p>
          <p>
            מייל:
            <span>
              {tenantData ? (
                <a
                  href={`mailto:${tenantData.tenantEmail}`}
                  className="text-decoration-none"
                >
                  {tenantData.tenantEmail}
                </a>
              ) : (
                ""
              )}
            </span>
          </p>
          <br />
          {/* only if the tenant is a renter display the owner's info */}
          {tenantData
            ? tenantData.tenantType === "שכירות" && (
                <>
                  <p>
                    שם בעל הבית:
                    <span>
                      {tenantData
                        ? `${tenantData.ownerFirstName} ${tenantData.ownerLastName}`
                        : ""}
                    </span>
                  </p>

                  <p>
                    מספר טלפון בעל הבית:
                    <span>
                      {tenantData ? (
                        <a
                          href={`tel:+972${tenantData.ownerPhoneNumber}`}
                          className="text-decoration-none"
                        >
                          {tenantData.ownerPhoneNumber}
                        </a>
                      ) : (
                        ""
                      )}
                    </span>
                  </p>
                  <p>
                    מייל בעל הבית:
                    <span>
                      {tenantData ? (
                        <a
                          href={`mailto:${tenantData.ownerEmail}`}
                          className="text-decoration-none"
                        >
                          {tenantData.ownerEmail}
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
      </Modal.Body>
    </Modal>
  );
}

export default TenantDetails;
