const express = require("express");

const router = express.Router();

//Create a new maintenance request
router.post("/", (req, res) => {
  res.json({ description: "Create a new maintenance request" });
});

//Get all requests for a user
router.get("/", (req, res) => {
  res.json({ description: "Get all requests for a user" });
});

module.exports = router;
