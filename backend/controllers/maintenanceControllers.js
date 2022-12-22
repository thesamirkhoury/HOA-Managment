const MaintenanceRequest = require("../models/maintenance");
const mongoose = require("mongoose");

//* Managers

//Get all maintenance requests
//TODO: get hoa id from auth instead of body
async function getRequests(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const requests = await MaintenanceRequest.find({ HOA: hoaID });
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

  const request = await MaintenanceRequest.find({ _id: id });
  if (!request) {
    return res.status(404).json({ error: "No Request Found" });
  }
  res.status(200).json(request);
}

//Add a response to a maintenance requests by _id
async function addResponse(req, res) {
  const { id } = req.params;
  const { response } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Request Not Found" });
  }

  const request = await MaintenanceRequest.findByIdAndUpdate(
    id,
    { response: response },
    { new: true }
  );
  if (!request) {
    return res.status(404).json({ error: "No Requests Found" });
  }
  res.status(200).json(request);
}

//* Tenants

//Create a new maintenance request
//TODO: get tenant id, hoa id from auth instead of body
async function createRequest(req, res) {
  const { subject, description, pictures } = req.body;

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
    const request = await MaintenanceRequest.create({
      HOA: hoaID,
      tenant: tenantID,
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
//TODO: get tenant id, hoa id from auth instead of body
async function getUserRequests(req, res) {
  // get hoa id from user auth
  const { hoaID, tenantID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  const requests = await MaintenanceRequest.find({
    HOA: hoaID,
    tenant: tenantID,
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
