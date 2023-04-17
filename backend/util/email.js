const nodemailer = require("nodemailer");

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

module.exports = { sendSignupLink };