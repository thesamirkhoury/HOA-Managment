const express = require("express");

const router = express.Router();

//Create a new expense
router.post("/", (req, res) => {
  res.json({ description: "Create a new expense" });
});

//Get all expenses
router.get("/", (req, res) => {
  res.json({ description: "Get all expenses" });
});

//Get sum of expenses by month
router.get("/sum/:month", (req, res) => {
  res.json({ description: "Get sum of expenses by month" });
});

//Edit an expense by _id
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit an expense by _id" });
});

//Delete an expense by _id
router.delete("/:id", (req, res) => {
  res.json({ description: "Delete an expense by _id" });
});

module.exports = router;
