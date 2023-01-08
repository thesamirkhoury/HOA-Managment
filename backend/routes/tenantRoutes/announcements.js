const express = require("express");
//controller functions
const {
  getBuildingAnnouncements,
} = require("../../controllers/announcementControllers");
const router = express.Router();

//Get all the announcements
router.get("/", getBuildingAnnouncements);

module.exports = router;
