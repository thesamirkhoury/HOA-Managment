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
async function sendMail(receiverMail, subject, body) {
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
    text: body,
  });
}

async function sendSignupLink(receiver, username, token) {
  let subject = "הנחיות להרשמה למערכת הדיירים";
  let body = `
  ועד הבית הוסיף אותך למערכת.
  להלן פרטי ההרשמה:
  שם המשתמש: ${username}
  קישור להשלמת ההרשמה: http://localhost:3001/set-password/${token}
  `;

  await sendMail(receiver, subject, body);
}

async function sendNewBill(tenant_id, amount) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "התקבלה דרישת תשלום חדשה";
    let body = `
  שלום ${tenant.firstName},
  התקבלה דרישת תשלום חדשה עבורך על סך ${amount} ש״ח.
  לפרטים נוספים יש להכנס למערכת הדיירים.
  `;
    await sendMail(tenant.tenantEmail, subject, body);
  } catch (error) {
    throw Error(error);
  }
}

async function sendBillReminder(tenant_id) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "תזכורת לתשלום דרישת תשלום";
    let body = `
  שלום ${tenant.firstName},
  זאת תזכורת לשלם דרישת תשלום שהופקה על ידי הועד שלך.
  לפרטים נוספים יש להכנס למערכת הדיירים.
  `;
    await sendMail(tenant.tenantEmail, subject, body);
  } catch (error) {
    throw Error(error);
  }
}

async function sendResetLinkManager(recipient, firstName, token) {
  let subject = "איפוס סיסמה";
  let body = `
  שלום ${firstName},
  מצורף קישור לאיפוס הסיסמה
  http://localhost:3000/set-password/${token}
  `;
  await sendMail(receiver, subject, body);
}

async function sendInquiryResponse(tenant_id) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "תשובה לפנייה שלך";
    let body = `
  שלום ${tenant.firstName},
  התקבלה תשובה לפנייה שלך,
  לפרטים נוספים יש להכנס למערכת הדיירים.
  `;
    await sendMail(tenant.tenantEmail, subject, body);
  } catch (error) {
    throw Error(error);
  }
}

async function sendMaintenanceStatus(tenant_id) {
  try {
    const tenant = await findTenant(tenant_id);
    let subject = "שינוי בסטטוס קריאת השירות";
    let body = `
  שלום ${tenant.firstName},
  השתנה הססטוס לקריאת השירות שפתחת.
  לפרטים נוספים יש להכנס למערכת הדיירים.
  `;
    await sendMail(tenant.tenantEmail, subject, body);
  } catch (error) {
    throw Error(error);
  }
}

module.exports = {
  sendSignupLink,
  sendNewBill,
  sendBillReminder,
  sendResetLinkManager,
  sendInquiryResponse,
  sendMaintenanceStatus,
};
