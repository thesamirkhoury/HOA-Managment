const express = require("express");

const router = express.Router();

//Create a hoa (signup)
router.post("/signup", (req, res) => {
  res.json({ description: "Create a hoa (signup)" });
});

//login as hoa manager
router.post("/login", (req, res) => {
  res.json({ description: "login as hoa manager" });
});

//Get the hoa info
router.get("/", (req, res) => {
  res.json({ description: "Get the hoa info" });
});

//Edit the HOA info
router.patch("/", (req, res) => {
  res.json({ description: "Edit the HOA info" });
});

//Delete the HOA and close the account
router.delete("/", (req, res) => {
  res.json({ description: "Delete the HOA and close the account" });
});

module.exports = router;
