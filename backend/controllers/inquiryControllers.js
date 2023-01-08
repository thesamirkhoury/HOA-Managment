const Inquirie = require("../models/inquiries");
const mongoose = require("mongoose");

//* Managers

//Get all inquiries
//TODO: get hoa id from auth instead of body
async function getInquiries(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const inquiry = await Inquirie.find({ HOA: hoaID });
  if (!inquiry) {
    return res.status(404).json({ error: "No Inquiries Found" });
  }
  res.status(200).json(inquiry);
}

//Get a single inquiry by _id
async function getInquiry(req, res) {
  const { id } = req.params;

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Inquiries Not Found" });
  }

  const request = await Inquirie.find({ _id: id });
  if (!request) {
    return res.status(404).json({ error: "No Inquiry Found" });
  }
  res.status(200).json(request);
}

//Add a response to an inquiry by _id
//TODO: send a mail notifying User of a new response
async function addResponse(req, res) {
  const { id } = req.params;
  const { response } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Inquiry Not Found" });
  }

  const inquiry = await Inquirie.findByIdAndUpdate(
    id,
    { response: response, status: "סגור" },
    { new: true }
  );
  if (!inquiry) {
    return res.status(404).json({ error: "No Inquiries Found" });
  }
  res.status(200).json(inquiry);
}

//* Tenants

//Create a new inquiry
//TODO: get tenant id, hoa id from auth instead of body
async function createInquiry(req, res) {
  const { subject, body } = req.body;

  // get hoa id from user auth
  const { hoaID, tenantID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  try {
    const inquiry = await Inquirie.create({
      HOA: hoaID,
      tenant: tenantID,
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
//TODO: get tenant id, hoa id from auth instead of body
async function getUserInquiries(req, res) {
  // get hoa id from user auth
  const { hoaID, tenantID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  const inquiries = await Inquirie.find({
    HOA: hoaID,
    tenant: tenantID,
  }).sort({ createdAt: -1 });

  if (!inquiries) {
    return res.status(404).json({ error: "No Inquiries Found" });
  }
  res.status(200).json(inquiries);
}

module.exports = {
  getInquiries,
  getInquiry,
  addResponse,
  createInquiry,
  getUserInquiries,
};
