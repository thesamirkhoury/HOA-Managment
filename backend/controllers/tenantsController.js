const Association = require("../models/hoaModel");
const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("../models/hoaModel");

//TODO: Improve this function once Auth is implemented
//* Managers

//Create a new Tenant
async function newTenant(req, res) {
  const {
    firstName,
    lastName,
    buildingNumber,
    houseNumber,
    parkingSpot,
    tenantPhoneNumber,
    tenantEmail,
    password,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
    hoaID,
  } = req.body;

  // check if the user already exists
  const hoaDoc = await Association.findById(hoaID);
  const tenants = hoaDoc.tenants;
  tenants.map((tenant) => {
    if (tenant.tenantEmail === tenantEmail) {
      return res.status(400).json({ error: "Tenant already exists" });
    }
  });

  //add the tenant to the list
  const newTenant = {
    firstName,
    lastName,
    buildingNumber,
    houseNumber,
    parkingSpot,
    tenantPhoneNumber,
    tenantEmail,
    password,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  };
  tenants.push(newTenant);
  const updated = await Association.findByIdAndUpdate(
    hoaID,
    { tenants },
    { new: true }
  );
  res.status(200).json(updated);
}
//get all tenants
async function getTenants(req, res) {
  const { hoaID } = req.body;
  const tenants = await Association.findById(hoaID).select("tenants");
  res.status(200).json(tenants);
}
//get one tenant by id
async function getTenant(req, res) {
  const { id } = req.params;
  //   const { hoaID } = req.body;

  //check if tenant ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid tenant ID" });
  }

  const hoa = await Association.findOne({ "tenants._id": id });
  // if no tenant found, return error.
  if (!hoa) {
    return res.status(404).json({ error: "No tenant Found" });
  }
  // the tenant is found, return that tenant only
  const tenants = hoa.tenants;
  tenants.map((tenant) => {
    if (tenant._id.equals(id)) {
      return res.status(200).json(tenant);
    }
  });
}

async function updateTenant(req, res) {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    buildingNumber,
    houseNumber,
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

//   check if tenant ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid tenant ID" });
  }
  const tenantDetails = {
    firstName,
    lastName,
    buildingNumber,
    houseNumber,
    parkingSpot,
    tenantPhoneNumber,
    tenantEmail,
    password,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  };

  const updateTenant = await Association.findOneAndUpdate(
    { "tenants._id": id },
    { $set: { "tenants.$": tenantDetails } },
    { new: true }
  );
  if(!updateTenant){
    return res.status(404).json({ error: "No tenant Found" });
  }
  res.status(200).json(updateTenant);
}
module.exports = { newTenant, getTenants, getTenant, updateTenant };
