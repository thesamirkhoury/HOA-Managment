const express = require("express");

const router = express.Router();

//Create a new bill and send by mail
router.post("/", (req, res) => {
  res.json({ description: "Create a new bill and send by mail" });
});

//Get all bills
router.get("/", (req, res) => {
  res.json({ description: "Get all bills" });
});

//Get the sum of all paid bills by a specific month
router.get("/sum/:month", (req, res) => {
  res.json({
    description: "Get the sum of all paid bills by a specific month",
  });
});

//Edit a bill by _id
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit a bill by _id" });
});

//Delete a bill by _id
router.delete("/:id", (req, res) => {
  res.json({ description: "Delete a bill by _id" });
});

//Add a payment record to an existing bill by _id
router.patch("/:id/payment", (req, res) => {
  res.json({ description: "Add a payment record to an existing bill by _id" });
});

//Send email reminder by mail to pay the bill by _id
router.post("/:id/reminder", (req, res) => {
  res.json({
    description: "Send email reminder by mail to pay the bill by _id",
  });
});

module.exports = router;
