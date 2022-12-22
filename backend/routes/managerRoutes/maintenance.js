const express = require("express");
//controller functions
const {
  getRequests,
  getRequest,
  addResponse,
} = require("../../controllers/maintenanceControllers");
const router = express.Router();

//Get all maintenance requests
router.get("/", getRequests);

//Get one maintenance requests by _id
router.get("/:id", getRequest);

//Add a response to a maintenance requests by _id
router.patch("/:id/response", addResponse);

//Forward request by _id to a supplier by email
router.post("/:id/forward/:email", (req, res) => {
  res.json({ description: "Forward request by _id to a supplier by email" });
});

module.exports = router;
