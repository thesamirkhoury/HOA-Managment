const Inquirie = require("../models/inquiries");
const mongoose = require("mongoose");

//* Managers

//Get all inquiries
async function getInquiries(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const inquiry = await Inquirie.find({ hoa_id });
  if (!inquiry) {
    return res.status(404).json({ error: "לא נמצאו פניות." });
  }
  res.status(200).json(inquiry);
}

//Add a response to an inquiry by _id
async function addResponse(req, res) {
  const { id } = req.params;
  const { response } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "פנייה זאת אינה קמיית במערכת." });
  }

  const inquiry = await Inquirie.findByIdAndUpdate(
    id,
    { response: response, status: "סגור" },
    { new: true }
  );
  if (!inquiry) {
    return res.status(404).json({ error: "לא נמצאו פניות." });
  }
  res.status(200).json(inquiry);
}

//* Tenants

//Create a new inquiry
async function createInquiry(req, res) {
  const { subject, body } = req.body;
  //Validation
  if (!subject || !body) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  // hoa id from auth
  const hoa_id = req.user.hoa_id;
  // tenant id from auth
  const tenant_id = req.user._id;

  try {
    const inquiry = await Inquirie.create({
      hoa_id,
      tenant_id,
      subject,
      body,
      status: "פתוח",
      response: "",
    });
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all inquires for a user
async function getUserInquiries(req, res) {
  // tenant id from auth
  const tenant_id = req.user._id;

  const inquiries = await Inquirie.find({
    tenant_id,
  }).sort({ createdAt: -1 });

  if (!inquiries) {
    return res.status(404).json({ error: "לא נמצאו פניות." });
  }
  res.status(200).json(inquiries);
}

module.exports = {
  getInquiries,
  addResponse,
  createInquiry,
  getUserInquiries,
};
