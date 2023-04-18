const HOA = require("../models/hoa");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { sendResetLinkManager } = require("../util/email");

// JWT Create Token Function
function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

//* Managers
//Create a new HOA user - (Signup)
async function signup(req, res) {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    address,
    membersMonthlyFee,
    buildingCount,
    fileNumber,
  } = req.body;

  // sign up user
  try {
    const newHoa = await HOA.signup(
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      address,
      membersMonthlyFee,
      buildingCount,
      fileNumber
    );
    // create JWT
    const token = createToken(newHoa._id);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Login a HOA user
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await HOA.login(email, password);
    // create JWT
    const token = createToken(user._id);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Forget Password
async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await HOA.forgotPassword(email);
    //email the reset link
    sendResetLinkManager(user.email, user.firstName, user.token);

    res.status(200).json({
      resetMessage:
        "הוראות לאיפוס הסיסמה יישלחו בדקות הקרובות לכתובת המייל המעודכן במערכת.",
    });
  } catch (error) {
    // if user enters an incorrect email, send a generic message for security purposes.
    if (error.message === "Incorrect Email") {
      res.status(200).json({
        resetMessage:
          "הוראות לאיפוס הסיסמה יישלחו בדקות הקרובות לכתובת המייל המעודכן במערכת.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

// Reset the user password using a reset token
async function resetPassword(req, res) {
  const { resetToken } = req.params;
  const { password } = req.body;
  try {
    const user = await HOA.resetPassword(resetToken, password);
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
  const hoa_id = req.user._id;
  try {
    const user = await HOA.changePassword(hoa_id, currentPassword, newPassword);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//Returns the Full HOA data
async function getAllDetails(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const hoa = await HOA.findById(hoa_id).select(
    "firstName lastName phoneNumber email address membersMonthlyFee buildingCount fileNumber"
  );
  if (!hoa) {
    return res
      .status(404)
      .json({ error: "חשבון ועד עם הממייל שהוזן אינו קיים במערכת." });
  }
  res.status(200).json(hoa);
}

//Edit the HOA Details
async function editHoa(req, res) {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
    membersMonthlyFee,
    buildingCount,
    fileNumber,
  } = req.body;
  // hoa id from auth
  const hoa_id = req.user._id;

  const updated = {
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
    membersMonthlyFee,
    buildingCount,
    fileNumber,
  };

  const hoa = await HOA.findByIdAndUpdate(hoa_id, updated, { new: true });
  if (!hoa) {
    return res.status(404).json({ error: "חשבון ועד אינו קיים." });
  }
  res.status(200).json(hoa);
}

//Delete the HOA and close the account
async function deleteHoa(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const hoa = await HOA.findByIdAndDelete(hoa_id);
  if (!hoa) {
    return res.status(404).json({ error: "חשבון ועד אינו קיים." });
  }
  res.status(200).json(hoa);
}

//* Tenants
//Get the hoa info
async function getInfo(req, res) {
  // hoa id from auth
  const hoa_id = req.user.hoa_id;

  const hoa = await HOA.findById(hoa_id).select(
    "firstName lastName address membersMonthlyFee fileNumber"
  );

  if (!hoa) {
    return res.status(404).json({ error: "חשבון ועד אינו קיים." });
  }
  res.status(200).json(hoa);
}

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getAllDetails,
  changePassword,
  editHoa,
  deleteHoa,
  getInfo,
};
