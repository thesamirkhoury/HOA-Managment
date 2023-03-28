const Tenant = require("../models/tenants");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// JWT Create Token Function
function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

//* Managers

//Create a new Tenant
async function signup(req, res) {
  // request body
  const {
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    phoneNumber,
    tenantEmail,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  } = req.body;
  // hoa id from auth
  const hoa_id = req.user._id;

  let username = `${tenantEmail.split("@")[0]}@${req.user.fileNumber}`;
  try {
    const newTenant = await Tenant.signup(
      hoa_id,
      firstName,
      lastName,
      buildingNumber,
      apartmentNumber,
      parkingSpot,
      phoneNumber,
      tenantEmail,
      username,
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
async function getTenants(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoa_id)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const tenants = await Tenant.find({ hoa_id });
  if (!tenants) {
    return res.status(404).json({ error: "No tenant Found" });
  }
  res.status(200).json(tenants);
}

//Edit a tenant by _id
//!check update method, check params -- deleted
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
  // hoa id from auth
  const hoa_id = req.user._id;

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoa_id)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const tenant = await Tenant.findByIdAndUpdate(
    id,
    {
      hoa_id,
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

//Delete a tenant by _idy
async function deleteTenant(req, res) {
  const { id } = req.params;

  const tenant = await Tenant.findOneAndDelete({ _id: id });
  if (!tenant) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(tenant);
}

//* Tenants

//Login as a tenant
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await Tenant.login(email, password);
    // create JWT
    const token = createToken(user._id);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Create First Password as a tenant
async function createPassword(req, res) {
  const { resetToken } = req.params;
  const { password } = req.body;
  try {
    const user = await Tenant.setPassword(resetToken, password);
    // create JWT
    const token = createToken(user._id);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get tenant details
async function getTenant(req, res) {
  // tenant id from auth
  const tenant_id = req.user._id;

  const tenant = await Tenant.findById(tenant_id).select(
    "firstName lastName buildingNumber apartmentNumber parkingSpot phoneNumber tenantEmail username tenantType"
  );
  if (!tenant) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(tenant);
}

//Edit the info of the tenant
//! Check edit function parameters
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
  // tenant id from auth
  const tenant_id = req.user._id;

  const tenant = await Tenant.findByIdAndUpdate(tenant_id, {});
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
  createPassword,
  getTenant,
  editTenant,
};
