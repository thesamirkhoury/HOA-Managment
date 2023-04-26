const express = require("express");
//controller functions
const {
  getRequests,
  changeStatus,
  forwardRequest,
  viewImage,
} = require("../../controllers/maintenanceControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Get all maintenance requests
router.get("/", getRequests);

//Change the status to a maintenance requests by _id
router.patch("/:id/status", changeStatus);

//Forward request by _id to a supplier by email
router.post("/:id/forward", forwardRequest);

//View Documentation Image by image path
router.get("/view/:path", viewImage);

module.exports = router;
