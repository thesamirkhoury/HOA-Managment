const express = require("express");

const router = express.Router();

//Get all maintenance requests
router.get("/", (req, res) => {
  res.json({ description: "Get all maintenance requests" });
});

//Get one maintenance requests by _id
router.get("/:id", (req, res) => {
  res.json({ description: "Get one maintenance requests by _id" });
});

//Add a response to a maintenance requests by _id
router.patch("/:id/response", (req, res) => {
  res.json({ description: "Add a response to a maintenance requests by _id" });
});

//Forward request by _id to a supplier by email
router.post("/:id/forward/:email", (req, res) => {
  res.json({ description: "Forward request by _id to a supplier by email" });
});

module.exports = router;
