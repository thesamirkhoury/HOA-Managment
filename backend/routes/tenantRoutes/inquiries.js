const express = require("express");
//controller functions
const {
  createInquiry,
  getUserInquiries,
} = require("../../controllers/inquiryControllers");
const router = express.Router();

//Create a new inquiry
router.post("/", createInquiry);

//Get all inquires for a user
router.get("/", getUserInquiries);

module.exports = router;
