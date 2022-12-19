const express = require("express");

const router = express.Router();

//Get all documents
router.get("/", (req, res) => {
  res.json({ description: "Get all documents" });
});

module.exports = router;
