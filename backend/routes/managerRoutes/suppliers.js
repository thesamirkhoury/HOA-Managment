const express = require("express");

const router = express.Router();

//Create a new supplier
router.post("/", (req, res) => {
  res.json({ description: "Create a new supplier" });
});

//Get all suppliers
router.get("/", (req, res) => {
  res.json({ description: "Get all suppliers" });
});

// Get a single supplier by _id
router.get("/:id", (req, res) => {
  res.json({ description: "Get a single supplier by _id" });
});

//Edit a supplier by _id
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit a supplier by _id" });
});

//Delete a supplier by _id
router.delete("/:id", (req, res) => {
  res.json({ description: "Delete a supplier by _id" });
});

module.exports = router;
