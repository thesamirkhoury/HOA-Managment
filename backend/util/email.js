const nodemailer = require("nodemailer");
const Tenant = require("../models/tenants");

//helper function
async function findTenant(id) {
  const tenant = await Tenant.findById(id);
  if (!tenant) {
    throw Error("הדייר אינו קיים");
  }
  return tenant;
}

//Send Mail function
async function sendMail(receiverMail, subject, html) {
  //set up the transporter
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  //send the email
  transporter.sendMail({
    from: `${process.env.MAIL_SENDER_NAME} <${process.env.MAIL_USER}>`,
    to: receiverMail,
    subject: subject,
    html: html,
  });
}

async function sendSignupLink(receiver, firstName, username, token) {
  let subject = "הנחיות להרשמה למערכת הדיירים";
  let html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="he" dir="rtl">

  <head data-id="__react-email-head"></head>
  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">הנחיות להרשמה למערכת הדיירים
  </div>

  <body data-id="__react-email-body" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px;width:465px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px;display:grid;justify-content:center">
              <tbody>
                <tr>
                  <td><img data-id="react-email-img" alt="logo" src="${process.env.LOGO_URL}" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;background-color:rgb(255,255,255)" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <h1 data-id="react-email-heading" style="color:rgb(0,0,0);text-align:center;font-weight:400;font-size:24px">הועד שלך רוצה לצרף אותך למערכת נהל.</h1>
                    <p data-id="react-email-text" style="font-size:18px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">שלום ${firstName},</p>
                    <p data-id="react-email-text" style="font-size:18px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">הועד שלך הוסיף אותך למערכת ניהול ועד הבית, להלן פרטי החשבון שלך.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
              <tbody>
                <tr>
                  <td>
                    <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">שם המשתמש שלך:<br /><strong>${username}</strong></p><a href="${process.env.TENANTS_URL}/set-password/${token}" data-id="react-email-button" target="_blank" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center"><span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">ליצירת סיסמה</span><span></span></a>
                    <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">או ללחוץ/להעתיק את הקישור הבא:<br /><a href="${process.env.TENANTS_URL}/set-password/${token}" data-id="react-email-link" target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none">${process.env.TENANTS_URL}/set-password/${token}</a></p>
                    <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:16px 0">הקישור תקף ל-3 ימים בלבד.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(102,102,102);text-align:center">בעת השלמת ההרשמה למערכת, אתה מסקים<a href="${process.env.TERMS_URL}" data-id="react-email-link" target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none">לתנאי השימוש.</a><br />ההודעה הזאת נשלחה באופן אוטומאטי.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
  `;
  await sendMail(receiver, subject, html);
}

async function sendMaintenanceStatus(tenant_id, requestSubject) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "שינוי בסטטוס קריאת השירות";
    let html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="he" dir="rtl">

  <head data-id="__react-email-head"></head>
  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">עודכן סטטוס קריאת השירות שלך
  </div>

  <body data-id="__react-email-body" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px;width:465px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px;display:grid;justify-content:center">
              <tbody>
                <tr>
                  <td><img data-id="react-email-img" alt="logo" src="${process.env.LOGO_URL}" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;background-color:rgb(255,255,255)" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <h1 data-id="react-email-heading" style="color:rgb(0,0,0);text-align:center;font-weight:400;font-size:24px">עודכן סטטוס קריאת השירות שלך</h1>
                    <p data-id="react-email-text" style="font-size:18px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">שלום ${tenant.firstName},</p>
                    <p data-id="react-email-text" style="font-size:18px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">התעדכן הסטטוס לקריאת השירות שפתחת בנושה ${requestSubject}.<br />לפרטים נוספים יש להכנס למערכת הדיירים.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
              <tbody>
                <tr>
                  <td><a href="${process.env.TENANTS_URL}/maintenance" data-id="react-email-button" target="_blank" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center"><span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">כניסה למערכת</span><span></span></a></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(102,102,102);text-align:center">ההודעה הזאת נשלחה באופן אוטומאטי, כי המייל שלך מופיע במערכת ניהול ועד בית כדייר.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
    `;

    await sendMail(tenant.tenantEmail, subject, html);
  } catch (error) {
    throw Error(error);
  }
}

async function forwardToSupplier(recipient, description) {
  let subject = "העברת תיאור קריאת שירות";
  let html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="he" dir="rtl">

  <head data-id="__react-email-head"></head>
  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">פרטי קריאת שירות
  </div>

  <body data-id="__react-email-body" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px;width:465px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px;display:grid;justify-content:center">
              <tbody>
                <tr>
                  <td><img data-id="react-email-img" alt="logo" src="${process.env.LOGO_URL}" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;background-color:rgb(255,255,255)" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <h1 data-id="react-email-heading" style="color:rgb(0,0,0);text-align:center;font-weight:400;font-size:24px">פרטי קריאת שירות</h1>
                    <p data-id="react-email-text" style="font-size:18px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">להלן פרטי קריאת השירות:</p>
                    <p data-id="react-email-text" style="font-size:18px;line-height:24px;margin:16px 0;color:rgb(0,0,0);text-align:center">${description}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(102,102,102);text-align:center">ההודעה הזאת נשלחה באופן אוטומאטי, כי ועד בית העביר לך פרטי הקריאה כספק.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  `;

  await sendMail(recipient, subject, html);
}

async function sendInquiryResponse(tenant_id, inqurySubject) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "תשובה לפנייה שלך";
    let html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="he" dir="rtl">
  <head data-id="__react-email-head">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <div
    id="__react-email-preview"
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    התקבלה תשובה לפנייה שלך
  </div>
  <body
    data-id="__react-email-body"
    style="
      background-color: rgb(255, 255, 255);
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    "
  >
    <table
      align="center"
      width="100%"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: 37.5em;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(234, 234, 234);
        border-radius: 0.25rem;
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 465px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top: 32px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      data-id="react-email-img"
                      alt="logo"
                      src="/static/logo.svg"
                      width="212"
                      height="88"
                      style="
                        display: block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <h1
                      data-id="react-email-heading"
                      style="
                        color: rgb(0, 0, 0);
                        text-align: center;
                        font-weight: 400;
                        font-size: 24px;
                      "
                    >
                      התקבלה תשובה לפנייה שלך
                    </h1>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      שלום ${tenant.firstName},
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      התקבלה תשובה לפנייה השירות שלך בנושה ${inqurySubject}.
                      <br />
                      לפרטים
                      נוספים יש להכנס למערכת הדיירים.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align: center"
            >
              <tbody>
                <tr>
                  <td>
                    <a
                      href="${process.env.TENANTS_URL}/inquires"
                      data-id="react-email-button"
                      target="_blank"
                      style="
                        line-height: 100%;
                        text-decoration: none;
                        display: inline-block;
                        max-width: 100%;
                        padding: 12px 20px;
                        background-color: rgb(0, 0, 0);
                        border-radius: 0.25rem;
                        color: rgb(255, 255, 255);
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration-line: none;
                        text-align: center;
                      "
                      ><span></span
                      ><span
                        style="
                          max-width: 100%;
                          display: inline-block;
                          line-height: 120%;
                          mso-padding-alt: 0px;
                          mso-text-raise: 9px;
                        "
                        >כניסה למערכת</span
                      ><span></span
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(102, 102, 102);
                      "
                    >
                      ההודעה הזאת נשלחה באופן אוטומאטי, כי המייל שלך מופיע
                      במערכת ניהול ועד בית כדייר.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
    `;
    await sendMail(tenant.tenantEmail, subject, html);
  } catch (error) {
    throw Error(error);
  }
}

async function sendNewBill(tenant_id, amount) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "התקבלה דרישת תשלום חדשה";
    let html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="he" dir="rtl">
  <head data-id="__react-email-head">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <div
    id="__react-email-preview"
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    הושג עבורך דרישת תשלום חדשה
  </div>
  <body
    data-id="__react-email-body"
    style="
      background-color: rgb(255, 255, 255);
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    "
  >
    <table
      align="center"
      width="100%"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: 37.5em;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(234, 234, 234);
        border-radius: 0.25rem;
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 465px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top: 32px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      data-id="react-email-img"
                      alt="logo"
                      src="/static/logo.svg"
                      width="212"
                      height="88"
                      style="
                        display: block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <h1
                      data-id="react-email-heading"
                      style="
                        color: rgb(0, 0, 0);
                        text-align: center;
                        font-weight: 400;
                        font-size: 24px;
                      "
                    >
                      דרישת תשלום חדשה
                    </h1>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      שלום ${tenant.firstName},
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      התקבלה דרישת תשלום חדשה עבורך על סך ${amount} ש״ח.
                      <br />
                      לפרטים נוספים יש להכנס למערכת הדיירים.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align: center"
            >
              <tbody>
                <tr>
                  <td>
                    <a
                      href="${process.env.TENANTS_URL}/billings"
                      data-id="react-email-button"
                      target="_blank"
                      style="
                        line-height: 100%;
                        text-decoration: none;
                        display: inline-block;
                        max-width: 100%;
                        padding: 12px 20px;
                        background-color: rgb(0, 0, 0);
                        border-radius: 0.25rem;
                        color: rgb(255, 255, 255);
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration-line: none;
                        text-align: center;
                      "
                      ><span></span
                      ><span
                        style="
                          max-width: 100%;
                          display: inline-block;
                          line-height: 120%;
                          mso-padding-alt: 0px;
                          mso-text-raise: 9px;
                        "
                        >כניסה למערכת</span
                      ><span></span
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(102, 102, 102);
                      "
                    >
                      ההודעה הזאת נשלחה באופן אוטומאטי, כי המייל שלך מופיע
                      במערכת ניהול ועד בית כדייר.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
    `;

    await sendMail(tenant.tenantEmail, subject, html);
  } catch (error) {
    throw Error(error);
  }
}

async function sendBillReminder(tenant_id, amount) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "תזכורת לתשלום דרישת תשלום";
    let html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="he" dir="rtl">
  <head data-id="__react-email-head">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <div
    id="__react-email-preview"
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    תזכורת לתשלום דרישת תשלום
  </div>
  <body
    data-id="__react-email-body"
    style="
      background-color: rgb(255, 255, 255);
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    "
  >
    <table
      align="center"
      width="100%"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: 37.5em;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(234, 234, 234);
        border-radius: 0.25rem;
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 465px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top: 32px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      data-id="react-email-img"
                      alt="logo"
                      src="/static/logo.svg"
                      width="212"
                      height="88"
                      style="
                        display: block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <h1
                      data-id="react-email-heading"
                      style="
                        color: rgb(0, 0, 0);
                        text-align: center;
                        font-weight: 400;
                        font-size: 24px;
                      "
                    >
                      תזכורת לתשלום דרישת תשלום
                    </h1>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      שלום ${tenant.firstName},
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      זאת תזכורת לשלם דרישת תשלום שהופקה על ידי הועד שלך על סך
                      ${amount} ש״ח.
                      <br />
                      לפרטים נוספים יש להכנס למערכת הדיירים.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align: center"
            >
              <tbody>
                <tr>
                  <td>
                    <a
                      href="${process.env.TENANTS_URL}/billing"
                      data-id="react-email-button"
                      target="_blank"
                      style="
                        line-height: 100%;
                        text-decoration: none;
                        display: inline-block;
                        max-width: 100%;
                        padding: 12px 20px;
                        background-color: rgb(0, 0, 0);
                        border-radius: 0.25rem;
                        color: rgb(255, 255, 255);
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration-line: none;
                        text-align: center;
                      "
                      ><span></span
                      ><span
                        style="
                          max-width: 100%;
                          display: inline-block;
                          line-height: 120%;
                          mso-padding-alt: 0px;
                          mso-text-raise: 9px;
                        "
                        >כניסה למערכת</span
                      ><span></span
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(102, 102, 102);
                      "
                    >
                      ההודעה הזאת נשלחה באופן אוטומאטי, כי המייל שלך מופיע
                      במערכת ניהול ועד בית כדייר.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
    `;

    await sendMail(tenant.tenantEmail, subject, html);
  } catch (error) {
    throw Error(error);
  }
}

async function sendResetLink(recipient, firstName, url) {
  let subject = "איפוס סיסמה";

  let html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="he" dir="rtl">
  <head data-id="__react-email-head">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <div
    id="__react-email-preview"
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    הושג עבורך דרישת תשלום חדשה
  </div>
  <body
    data-id="__react-email-body"
    style="
      background-color: rgb(255, 255, 255);
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    "
  >
    <table
      align="center"
      width="100%"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: 37.5em;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(234, 234, 234);
        border-radius: 0.25rem;
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 465px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top: 32px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      data-id="react-email-img"
                      alt="logo"
                      src="/static/logo.svg"
                      width="212"
                      height="88"
                      style="
                        display: block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <h1
                      data-id="react-email-heading"
                      style="
                        color: rgb(0, 0, 0);
                        text-align: center;
                        font-weight: 400;
                        font-size: 24px;
                      "
                    >
                      שחכת את הסיסה שלך?
                    </h1>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      שלום ${firstName},
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      קיבלנו בקשה לאיפוס הסיסמה שלך, מצורף קישור לבחירת סיסמה
                      חדשה.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align: center"
            >
              <tbody>
                <tr>
                  <td>
                    <a
                      href="${url}"
                      data-id="react-email-button"
                      target="_blank"
                      style="
                        line-height: 100%;
                        text-decoration: none;
                        display: inline-block;
                        max-width: 100%;
                        padding: 12px 20px;
                        background-color: rgb(0, 0, 0);
                        border-radius: 0.25rem;
                        color: rgb(255, 255, 255);
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration-line: none;
                        text-align: center;
                      "
                      ><span></span
                      ><span
                        style="
                          max-width: 100%;
                          display: inline-block;
                          line-height: 120%;
                          mso-padding-alt: 0px;
                          mso-text-raise: 9px;
                        "
                        >איפוס סיסמה</span
                      ><span></span
                    ></a>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      או בקישור הבא:<br /><a
                        href="${url}"
                        data-id="react-email-link"
                        target="_blank"
                        style="
                          color: rgb(37, 99, 235);
                          text-decoration: none;
                          text-decoration-line: none;
                        "
                        >${url}</a
                      >
                    </p>
                    <p
                      data-id="react-email-text"
                      style="font-size: 12px; line-height: 24px; margin: 16px 0"
                    >
                      הקישור תקף ל-10 דקות בלבד.
                      <br />
                      אם לא ביקשת להחליף את הסיסמה ניתן להתעלם מהייל הזה.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(102, 102, 102);
                      "
                    >
                      ההודעה הזאת נשלחה באופן אוטומאטי, כי המייל שלך מופיע
                      במערכת ניהול ועד בית כדייר.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  `;

  await sendMail(recipient, subject, html);
}

async function sendCloseAccount(recipient, firstName) {
  let subject = "אישור סגירת חשבון";
  let html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="he" dir="rtl">
  <head data-id="__react-email-head">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <div
    id="__react-email-preview"
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    אישור סגירת חשבון
  </div>
  <body
    data-id="__react-email-body"
    style="
      background-color: rgb(255, 255, 255);
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    "
  >
    <table
      align="center"
      width="100%"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: 37.5em;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(234, 234, 234);
        border-radius: 0.25rem;
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 465px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top: 32px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      data-id="react-email-img"
                      alt="logo"
                      src="/static/logo.svg"
                      width="212"
                      height="88"
                      style="
                        display: block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <h1
                      data-id="react-email-heading"
                      style="
                        color: rgb(0, 0, 0);
                        text-align: center;
                        font-weight: 400;
                        font-size: 24px;
                      "
                    >
                      אישור על סגירת חשבון הועד
                    </h1>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      שלום ${firstName},
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      המייל הזה מאשר את סגירת החשבון שלך.
                      <br />
                      כל המידע ייחקבמהלך הדקות הקובות, כולל כל ההוצאות וההכנסות, ותחסם גישת
                      הדיירים למערכת.
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                      "
                    >
                      הפעולה הינה סופית והידע לא ניתן לשיחזור.
                      <br />
                      זה הינו אישור סופי, הודעה נוספת לא תשלח.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(102, 102, 102);
                      "
                    >
                      ההודעה הזאת נשלחה באופן אוטומאטי.<br />כל מהשצוין לעיל
                      הינו בהתאם<a
                        href="${process.env.TERMS_URL}"
                        data-id="react-email-link"
                        target="_blank"
                        style="
                          color: rgb(37, 99, 235);
                          text-decoration: none;
                          text-decoration-line: none;
                        "
                        >לתנאי השימוש.</a
                      ><br />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

  `;

  await sendMail(recipient, subject, html);
}

module.exports = {
  sendSignupLink,
  sendMaintenanceStatus,
  forwardToSupplier,
  sendInquiryResponse,
  sendNewBill,
  sendBillReminder,
  sendResetLink,
  sendCloseAccount,
};
