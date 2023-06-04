import React from "react";

function Support() {
  return (
    <div className="mt-2" id="support">
      <hr />
      <div className="mt-2 ms-3 mb-2">
        <h2 className="mt-2">תמיכה</h2>

        <p className="fs-5">
          לכל פנייה ניתן לשלוח מייל לכתובת
          <a
            className="ms-1"
            href={`mailto: ${process.env.REACT_APP_SUPPORT_EMAIL}`}
          >
            {process.env.REACT_APP_SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Support;
