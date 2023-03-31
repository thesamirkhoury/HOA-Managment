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
    const tenant = await Tenant.signup(
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

    //email the signup link to tenant
    //TODO: use the email util to email a signup link with the token and username, temp log the token in console
    console.log(tenant.user.tenantEmail, tenant.user.username, tenant.token);

    //return only the tenant data, without the pure token
    res.status(200).json(tenant.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//get all tenants
async function getTenants(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const tenants = await Tenant.find({ hoa_id });
  if (!tenants) {
    return res.status(404).json({ error: "No tenant Found" });
  }
  res.status(200).json(tenants);
}

//Edit a tenant by _id
async function editTenant(req, res) {
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
  const { id } = req.params;
  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  const tenant = await Tenant.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true }
  );
  if (!tenant) {
    return res.status(404).json({ error: "Tenant Not Found" });
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
  const { username, password } = req.body;
  try {
    const user = await Tenant.login(username, password);
    // create JWT
    const token = createToken(user._id);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Forget Password
async function forgotPassword(req, res) {
  const { username } = req.body;
  try {
    const user = await Tenant.forgotPassword(username);
    //email the reset link
    //TODO: use the email util to email the reset link with the token, temp log the token in console
    console.log(user.email, user.username, user.token);

    res.status(200).json({
      resetMessage:
        "Instructions to reset the password are sent to the email provided",
    });
  } catch (error) {
    // if user enters an incorrect username, send a generic message for security purposes.
    if (error.message === "Incorrect username") {
      res.status(200).json({
        resetMessage:
          "Instructions to reset the password are sent to the email provided",
      });
    }
    // if there is any other errors, sed back
    else {
      res.status(400).json({ error: error.message });
    }
  }
}

// Reset the user password using a reset token
async function resetPassword(req, res) {
  const { resetToken } = req.params;
  const { password } = req.body;
  try {
    const user = await Tenant.resetPassword(resetToken, password);
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
async function editDetails(req, res) {
  // request body
  const { firstName, lastName, tenantPhoneNumber, tenantEmail } = req.body;
  // tenant id from auth
  const tenant_id = req.user._id;

  const tenant = await Tenant.findByIdAndUpdate(
    tenant_id,
    {
      firstName,
      lastName,
      tenantPhoneNumber,
      tenantEmail,
    },
    { new: true }
  );
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
  forgotPassword,
  resetPassword,
  getTenant,
  editDetails,
};
