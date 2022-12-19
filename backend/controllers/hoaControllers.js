const HOA = require("../models/hoa");
const mongoose = require("mongoose");

//* Managers
//
//! For testing purposes only, turn into static method
async function signup(req, res) {
  const {
    firstName,
    lastName,
    managerEmail,
    password,
    address,
    membersMonthlyFee,
  } = req.body;
  try {
    const newHoa = await HOA.create({
      firstName,
      lastName,
      managerEmail,
      password,
      address,
      membersMonthlyFee,
    });
    res.status(200).json(newHoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//
//! implement using static method
async function login(req, res) {
  res.json({ description: "login as hoa manager" });
}

//Returns the Full HOA data
//TODO: get hoa id from auth instead of body
async function getAllDetails(req, res) {
  const { hoaID } = req.body; //change to auth id

  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "No such workout" });
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
    return res.status(404).json({ error: "No such workout" });
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
    return res.status(404).json({ error: "No such workout" });
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
    return res.status(404).json({ error: "No such workout" });
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
