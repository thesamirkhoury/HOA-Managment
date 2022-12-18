const express = require("express");

const router = express.Router();

// Get the hoa info
router.get("/",(req,res)=>{
  res.json({ description: "Get the hoa info" });
});

module.exports = router;