const express = require("express");

const router = express.Router();

//Create a new reminder
router.post("/", (req, res) => {
  res.json({ description: "Create a new reminder" });
});

//Get all reminders
router.get("/", (req, res) => {
  res.json({ description: "Get all reminders" });
});

//Edit a reminder by _id
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit a reminder by _id" });
});

//Delete a reminder by _id
router.delete("/:id", (req, res) => {
  res.json({ description: "Delete a reminder by _id" });
});

module.exports = router;
