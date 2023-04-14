const MaintenanceRequest = require("../models/maintenance");
const mongoose = require("mongoose");

//* Managers

//Get all maintenance requests
async function getRequests(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const requests = await MaintenanceRequest.find({ hoa_id });
  if (!requests) {
    return res.status(404).json({ error: "לא נמצאו קריאות שירות." });
  }
  res.status(200).json(requests);
}

//Get one maintenance requests by _id
async function getRequest(req, res) {
  const { id } = req.params;
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "קריאת שירות זאת אינה קמיית במערכת." });
  }

  const request = await MaintenanceRequest.findById(id);
  if (!request) {
    return res
      .status(404)
      .json({ error: "קריאת שירות זאת אינה קמיית במערכת." });
  }
  res.status(200).json(request);
}

//Change the status to a maintenance requests by _id
//TODO: send a mail notifying User of a change in status
async function changeStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const request = await MaintenanceRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!request) {
    return res.status(404).json({ error: "לא נמצאו קריאות שירות." });
  }
  res.status(200).json(request);
}

//* Tenants

//Create a new maintenance request
async function createRequest(req, res) {
  const { subject, description, pictures } = req.body;
  //Validation
  if (!subject || !description) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  // hoa id from auth
  const hoa_id = req.user.hoa_id;
  // tenant id from auth
  const tenant_id = req.user._id;

  try {
    const request = await MaintenanceRequest.create({
      hoa_id,
      tenant_id,
      subject,
      description,
      status: "פתוח",
      pictures,
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all requests for a user
async function getUserRequests(req, res) {
  // hoa id from auth
  const hoa_id = req.user.hoa_id;
  // tenant id from auth
  const tenant_id = req.user._id;

  const requests = await MaintenanceRequest.find({
    hoa_id,
    tenant_id,
  }).sort({ createdAt: -1 });

  if (!requests) {
    return res.status(404).json({ error: "לא נמצאו קריאות שירות." });
  }
  res.status(200).json(requests);
}

module.exports = {
  getRequests,
  getRequest,
  changeStatus,
  createRequest,
  getUserRequests,
};
