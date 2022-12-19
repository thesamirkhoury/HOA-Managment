const express = require("express");

const router = express.Router();

//Get all the announcements
router.get("/", (req, res) => {
  res.json({ description: "Get all the announcements" });
});

module.exports = router;
