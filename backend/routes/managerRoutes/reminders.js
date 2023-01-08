const express = require("express");
const {
  createReminder,
  getReminders,
  editReminder,
  deleteReminder,
} = require("../../controllers/reminderControllers");
const router = express.Router();

//Create a new reminder
router.post("/", createReminder);

//Get all reminders
router.get("/",getReminders);

//Edit a reminder by _id
router.patch("/:id", editReminder);

//Delete a reminder by _id
router.delete("/:id",deleteReminder);

module.exports = router;
