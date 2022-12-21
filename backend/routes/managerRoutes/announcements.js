const express = require("express");
// controller functions
const {
  createAnnouncement,
  getAnnouncements,
  editAnnouncement,
  deleteAnnouncement,
} = require("../../controllers/announcementControllers");

const router = express.Router();

//Create a new announcement
router.post("/", createAnnouncement);

//Get all announcements
router.get("/", getAnnouncements);

//Edit an announcement by _id
router.patch("/:id", editAnnouncement);

//Delete an announcement by _id
router.delete("/:id", deleteAnnouncement);

module.exports = router;
