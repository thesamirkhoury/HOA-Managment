const express = require("express");
//controller functions
const {
  createRequest,
  getUserRequests,
} = require("../../controllers/maintenanceControllers");
const router = express.Router();

//Create a new maintenance request
router.post("/", createRequest);

//Get all requests for a user
router.get("/", getUserRequests);

module.exports = router;
