const express = require("express");
//controller functions
const {
  getBuildingAnnouncements,
} = require("../../controllers/announcementControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Get all the announcements
router.get("/", getBuildingAnnouncements);

module.exports = router;
