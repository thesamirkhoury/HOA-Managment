const express = require("express");

const router = express.Router();

//Create a new announcement
router.post("/",(req,res)=>{
  res.json({ description: "Create a new announcement" });
});

//Get all announcements
router.get("/",(req,res)=>{
  res.json({ description: "Get all announcements" });
});

//Edit an announcement by _id
router.patch("/:id",(req,res)=>{
  res.json({ description: "Edit an announcement by _id" });
});

//Delete an announcement by _id
router.delete("/:id",(req,res)=>{
  res.json({ description: "Delete an announcement by _id" });
});

module.exports = router;
