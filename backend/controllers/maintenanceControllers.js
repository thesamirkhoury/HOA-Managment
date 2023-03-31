const MaintenanceRequest = require("../models/maintenance");
const mongoose = require("mongoose");

//* Managers

//Get all maintenance requests
async function getRequests(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const requests = await MaintenanceRequest.find({ hoa_id });
  if (!requests) {
    return res.status(404).json({ error: "No Requests Found" });
  }
  res.status(200).json(requests);
}

//Get one maintenance requests by _id
async function getRequest(req, res) {
  const { id } = req.params;
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Request Not Found" });
  }

  const request = await MaintenanceRequest.findById(id);
  if (!request) {
    return res.status(404).json({ error: "No Request Found" });
  }
  res.status(200).json(request);
}

//Add a response to a maintenance requests by _id
//TODO: send a mail notifying User of a new response
async function addResponse(req, res) {
  const { id } = req.params;
  const { response } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Request Not Found" });
  }

  const request = await MaintenanceRequest.findByIdAndUpdate(
    id,
    { response: response, status: "סגור" },
    { new: true }
  );
  if (!request) {
    return res.status(404).json({ error: "No Requests Found" });
  }
  res.status(200).json(request);
}

//* Tenants

//Create a new maintenance request
async function createRequest(req, res) {
  const { subject, description, pictures } = req.body;
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
      response: "",
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
    return res.status(404).json({ error: "No Requests Found" });
  }
  res.status(200).json(requests);
}

module.exports = {
  getRequests,
  getRequest,
  addResponse,
  createRequest,
  getUserRequests,
};
