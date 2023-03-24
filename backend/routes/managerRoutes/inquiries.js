const express = require("express");
//controller functions
const {
  getInquiries,
  getInquiry,
  addResponse,
} = require("../../controllers/inquiryControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);


//Get all inquiries
router.get("/", getInquiries);

//Get a single inquiry by _id
router.get("/:id", getInquiry);

//Add a response to an inquiry by _id
router.post("/:id/response", addResponse);

module.exports = router;
