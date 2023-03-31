const express = require("express");
// controller functions
const {
  createAnnouncement,
  getAnnouncements,
  editAnnouncement,
  deleteAnnouncement,
} = require("../../controllers/announcementControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Create a new announcement
router.post("/", createAnnouncement);

//Get all announcements
router.get("/", getAnnouncements);

//Edit an announcement by _id
router.patch("/:id", editAnnouncement);

//Delete an announcement by _id
router.delete("/:id", deleteAnnouncement);

module.exports = router;
