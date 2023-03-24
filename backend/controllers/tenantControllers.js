const Tenant = require("../models/tenants");
const mongoose = require("mongoose");

//TODO: Improve this function once Auth is implemented

//* Managers

//Create a new Tenant
//TODO: get hoa id from auth instead of body, and create a set password function
async function signup(req, res) {
  // request body
  const {
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    tenantPhoneNumber,
    email,
    password,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  } = req.body;

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  try {
    const newTenant = await Tenant.signup(
      firstName,
      lastName,
      buildingNumber,
      apartmentNumber,
      parkingSpot,
      tenantPhoneNumber,
      email,
      password,
      tenantType,
      ownerFirstName,
      ownerLastName,
      ownerPhoneNumber,
      ownerEmail
    );
    res.status(200).json(newTenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//get all tenants
//TODO: get hoa id from auth instead of body
async function getTenants(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const tenants = await Tenant.find({ HOA: hoaID });
  if (!tenants) {
    return res.status(404).json({ error: "No tenant Found" });
  }
  res.status(200).json(tenants);
}

//Edit a tenant by _id
//TODO: get hoa id from auth instead of body
async function editTenant(req, res) {
  const { id } = req.params;
  // request body
  const {
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    tenantPhoneNumber,
    tenantEmail,
    password,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  } = req.body;

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const tenant = await Tenant.findOneAndUpdate(
    { _id: id, HOA: hoaID },
    {
      HOA: hoaID,
      firstName,
      lastName,
      buildingNumber,
      apartmentNumber,
      parkingSpot,
      tenantPhoneNumber,
      tenantEmail,
      password,
      tenantType,
      ownerFirstName,
      ownerLastName,
      ownerPhoneNumber,
      ownerEmail,
    },
    { new: true }
  );
  if (!tenant) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(tenant);
}

//Delete a tenant by _id
//TODO: get hoa id from auth instead of body
async function deleteTenant(req, res) {
  const { id } = req.params;
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const tenant = await Tenant.findOneAndDelete({ _id: id, HOA: hoaID });
  if (!tenant) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(tenant);
}

//* Tenants

//Login as a tenant
//! implement using static method
async function login(req, res) {
  res.json({ description: "login as a tenant" });
}

//Get tenant details
//TODO: get tenant id from auth instead of body
async function getTenant(req, res) {
  // get tenant id from user auth
  const { tenantID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const tenant = await Tenant.findById(tenantID).select(
    "firstName lastName buildingNumber apartmentNumber parkingSpot tenantPhoneNumber tenantEmail tenantType"
  );
  if (!tenant) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(tenant);
}

//Edit the info of the tenant
//TODO: get tenant id, hoa id from auth instead of body
async function editTenant(req, res) {
  // request body
  const {
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    tenantPhoneNumber,
    tenantEmail,
    password,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  } = req.body;

  // get hoa id from user auth
  const { hoaID, tenantID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  const tenant = await Tenant.findOneAndUpdate({ _id: id, HOA: hoaID });
  if (!tenant) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(tenant);
}

module.exports = {
  signup,
  getTenants,
  editTenant,
  deleteTenant,
  login,
  getTenant,
  editTenant,
};
