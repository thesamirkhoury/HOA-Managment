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
//TODO: get hoa id from auth instead of body
async function getAllDetails(req, res) {
  const { hoaID } = req.body; //change to auth id

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const hoa = await HOA.findById(hoaID);
  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

//Edit the HOA Details
//TODO: get hoa id from auth instead of body
async function editHoa(req, res) {
  const { hoaID } = req.body; //change to auth id
  const {
    firstName,
    lastName,
    managerEmail,
    password,
    address,
    membersMonthlyFee,
  } = req.body;

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const updated = {
    firstName,
    lastName,
    managerEmail,
    password,
    address,
    membersMonthlyFee,
  }; //possible to replace with ...req.body, after auth

  const hoa = await HOA.findByIdAndUpdate(hoaID, updated, { new: true });
  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

//Delete the HOA and close the account
//TODO: get hoa id from auth instead of body
async function deleteHoa(req, res) {
  const { hoaID } = req.body; //change to auth id

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const hoa = await HOA.findByIdAndDelete(hoaID);
  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

//* Tenants
//Get the hoa info
//TODO: get hoa id from auth instead of body
async function getInfo(req, res) {
  const { hoaID } = req.body; //change to auth id

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const hoa = await HOA.findById(hoaID).select(
    "firstName lastName address membersMonthlyFee"
  );

  if (!hoa) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  res.status(200).json(hoa);
}

module.exports = { signup, login, getAllDetails, editHoa, deleteHoa, getInfo };
