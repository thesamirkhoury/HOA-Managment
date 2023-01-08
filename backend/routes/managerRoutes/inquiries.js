const express = require("express");
//controller functions
const {
  getInquiries,
  getInquiry,
  addResponse,
} = require("../../controllers/inquiryControllers");
const router = express.Router();

//Get all inquiries
router.get("/", getInquiries);

//Get a single inquiry by _id
router.get("/:id", getInquiry);

//Add a response to an inquiry by _id
router.post("/:id/response", addResponse);

module.exports = router;
