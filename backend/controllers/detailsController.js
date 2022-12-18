const Association = require("../models/hoaModel");
const mongoose = require("mongoose");

//* Managers
//TODO: Implement these functions once Auth is implemented

// Create a new HOA
//! For testing purposes only, an implementation will be created once Auth is implemented
async function signupManager(req, res) {
  const {
    firstName,
    lastName,
    managerEmail,
    password,
    address,
    membersMonthlyFee,
  } = req.body;
  try {
    const newHoa = await Association.create({
      hoaDetails: {
        firstName,
        lastName,
        managerEmail,
        password,
        address,
        membersMonthlyFee,
      },
    });
    res.status(200).json(newHoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login a user - (PLACEHOLDER)
async function loginManager(req,res){
  res.json({ description: "login as hoa manager" });
}

// Delete a HOA and close the account - (PLACEHOLDER)
async function closeAccount(req,res){
  res.json({ description: "Delete the HOA and close the account" });
}

// Return the Full HOA data
async function getFullDetails(req,res){
  res.json({
    description: "Get the hoa info",
    dataReturned: "Address, Monthly Fee, Manager's Full name, Email, Phone Number",
  });
}

// Edit the HOA Details
async function editDetails(req,res){
  res.json({ description: "Edit the HOA info" });
}

//* Tenants
//TODO: Implement these functions once Auth is implemented

// Returns the HOA data without personal Data
async function getDetails(req,res){
    res.json({
      description: "Get the hoa info",
      dataReturned:
        "Address, Monthly Fee, Manager's Full name",
    });
}

module.exports = {
  signupManager,
  loginManager,
  closeAccount,
  getFullDetails,
  editDetails,
  getDetails,
};
