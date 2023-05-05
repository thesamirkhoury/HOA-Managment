const Tenant = require("../models/tenants");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const {
  sendSignupLink,
  sendResetLink,
  sendUsername,
} = require("../util/email");

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

  let username = `${tenantEmail.split("@")[0]}@${
    req.user.fileNumber
  }`.toLowerCase();
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
    sendSignupLink(
      tenant.user.tenantEmail,
      tenant.user.firstName,
      tenant.user.username,
      tenant.token
    );

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

  const tenants = await Tenant.find({ hoa_id }).select(
    "firstName lastName buildingNumber apartmentNumber parkingSpot phoneNumber tenantEmail username tenantType ownerFirstName ownerLastName ownerPhoneNumber ownerEmail"
  );
  if (!tenants) {
    return res.status(404).json({ error: "הדייר אינו קיים במערכת." });
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
    return res.status(404).json({ error: "הדייר אינו קיים במערכת." });
  }

  if (!validator.isEmail(tenantEmail) || !validator.isEmail(ownerEmail)) {
    return res
      .status(404)
      .json({ error: "המייל שהיזנת אינו בפורמת מייל תקין." });
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
    return res.status(404).json({ error: "הדייר אינו קיים במערכת." });
  }
  res.status(200).json(tenant);
}

//Delete a tenant by _idy
async function deleteTenant(req, res) {
  const { id } = req.params;

  const tenant = await Tenant.findOneAndDelete({ _id: id });
  if (!tenant) {
    return res.status(404).json({ error: "הדייר אינו קיים במערכת." });
  }
  res.status(200).json(tenant);
}

//Send username reminder by mail
async function emailUsername(req, res) {
  const { id } = req.params;
  const tenant = await Tenant.findById(id);
  if (!tenant) {
    return res.status(404).json({ error: "הדייר אינו קיים במערכת." });
  }
  //email the username
  sendUsername(tenant.tenantEmail, tenant.firstName, tenant.username);
  res.status(200).json({ message: "שם המשתמש נשלח למייל בהצלחה" });
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
    sendResetLink(
      user.email,
      user.firstName,
      `${process.env.TENANTS_URL}/set-password/${user.token}`
    );

    res.status(200).json({
      resetMessage:
        "הוראות לאיפוס הסיסמה יישלחו בדקות הקרובות לכתובת המייל המעודכן במערכת.",
    });
  } catch (error) {
    // if user enters an incorrect username, send a generic message for security purposes.
    if (error.message === "Incorrect username") {
      res.status(200).json({
        resetMessage:
          "הוראות לאיפוס הסיסמה יישלחו בדקות הקרובות לכתובת המייל המעודכן במערכת.",
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

// change password
async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const tenant_id = req.user._id;
  try {
    const user = await Tenant.changePassword(
      tenant_id,
      currentPassword,
      newPassword
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
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
    return res.status(404).json({ error: "הדייר אינו קיים במערכת." });
  }
  res.status(200).json(tenant);
}

module.exports = {
  signup,
  getTenants,
  editTenant,
  deleteTenant,
  emailUsername,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  getTenant,
  editDetails,
};
