const express = require("express");

const router = express.Router();

//Get all inquiries
router.get("/", (req, res) => {
  res.json({ description: "Get all inquiries" });
});

//Get a single inquiry by _id
router.get("/:id", (req, res) => {
  res.json({ description: "Get a single inquiry by _id" });
});

//Add a response to an inquiry by _id
router.patch("/:id/response", (req, res) => {
  res.json({ description: "Add a response to an inquiry by _id" });
});

module.exports = router;
