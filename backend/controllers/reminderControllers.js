const Reminder = require("../models/reminders");
const mongoose = require("mongoose");

//* Managers

//Create a new reminder
async function createReminder(req, res) {
  const { title, body, dateAndTime } = req.body;
  // hoa id from auth
  const hoa_id = req.user._id;

  try {
    const reminder = await Reminder.create({
      hoa_id,
      title,
      body,
      dateAndTime,
    });
    res.status(200).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all reminders
async function getReminders(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const reminders = await Reminder.find({ hoa_id });
  if (!reminders) {
    return res.status(404).json({ error: "No Reminders Found" });
  }
  res.status(200).json(reminders);
}

//Edit a reminder by _id
async function editReminder(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Reminder Not Found" });
  }
  const { title, body, dateAndTime } = req.body;

  const reminder = await Reminder.findByIdAndUpdate(
    id,
    {
      title,
      body,
      dateAndTime,
    },
    { new: true }
  );

  if (!reminder) {
    return res.status(404).json({ error: "No Reminders Found" });
  }
  res.status(200).json(reminder);
}

//Delete a supplier by _id
async function deleteReminder(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Reminder Not Found" });
  }

  const reminder = await Reminder.findByIdAndDelete(id);
  if (!reminder) {
    return res.status(404).json({ error: "Supplier Not Found" });
  }
  res.status(200).json(reminder);
}

module.exports = {
  createReminder,
  getReminders,
  editReminder,
  deleteReminder,
};
