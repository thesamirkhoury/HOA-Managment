const express = require("express");

const router = express.Router();

//Get all bills for a user
router.get("/", (req, res) => {
  res.json({ description: "Get all bills for a user" });
});

//Get an invoice pdf based on bill _id
router.get("/:id/invoice", (req, res) => {
  res.json({ description: "Get an invoice pdf based on bill _id" });
});

module.exports = router;
