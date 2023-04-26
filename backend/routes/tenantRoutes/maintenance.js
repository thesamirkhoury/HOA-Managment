const express = require("express");
//controller functions
const {
  createRequest,
  getUserRequests,
  viewImage,
} = require("../../controllers/maintenanceControllers");
//middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");
const { upload } = require("../../middleware/upload");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Create a new maintenance request
router.post("/", upload.single("file"), createRequest);

//Get all requests for a user
router.get("/", getUserRequests);

//View Documentation Image by image path
router.get("/view/:path", viewImage);

module.exports = router;
