const express = require("express");
//controller functions
const {
  createRequest,
  getUserRequests,
} = require("../../controllers/maintenanceControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Create a new maintenance request
router.post("/", createRequest);

//Get all requests for a user
router.get("/", getUserRequests);

module.exports = router;
