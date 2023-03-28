const HOA = require("../models/hoa");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    email,
    password,
    address,
    membersMonthlyFee,
    fileNumber,
  } = req.body;

  // sign up user
  try {
    const newHoa = await HOA.signup(
      firstName,
      lastName,
      email,
      password,
      address,
      membersMonthlyFee,
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

//Returns the Full HOA data
async function getAllDetails(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const hoa = await HOA.findById(hoa_id);
  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

//Edit the HOA Details
async function editHoa(req, res) {
  const {
    firstName,
    lastName,
    managerEmail,
    password,
    address,
    membersMonthlyFee,
  } = req.body;
  // hoa id from auth
  const hoa_id = req.user._id;

  const updated = {
    firstName,
    lastName,
    managerEmail,
    password,
    address,
    membersMonthlyFee,
  }; //possible to replace with ...req.body, after auth

  const hoa = await HOA.findByIdAndUpdate(hoa_id, updated, { new: true });
  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

//Delete the HOA and close the account
async function deleteHoa(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const hoa = await HOA.findByIdAndDelete(hoa_id);
  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
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
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

module.exports = { signup, login, getAllDetails, editHoa, deleteHoa, getInfo };
