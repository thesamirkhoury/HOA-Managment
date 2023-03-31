const express = require("express");
//controller functions
const {
  createInquiry,
  getUserInquiries,
} = require("../../controllers/inquiryControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Create a new inquiry
router.post("/", createInquiry);

//Get all inquires for a user
router.get("/", getUserInquiries);

module.exports = router;
