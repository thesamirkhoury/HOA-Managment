const Reminder = require("../models/reminders");
const mongoose = require("mongoose");

//* Managers

//Create a new reminder
//TODO: get hoa id from auth instead of body
async function createReminder(req, res) {
  const { title, body, dateAndTime } = req.body;
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  try {
    const reminder = await Reminder.create({
      HOA: hoaID,
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
//TODO: get hoa id from auth instead of body
async function getReminders(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const reminders = await Reminder.find({ HOA: hoaID });

  if (!reminders) {
    return res.status(404).json({ error: "No Reminders Found" });
  }
  res.status(200).json(reminders);
}

//Edit a reminder by _id
//TODO: get hoa id from auth instead of body
async function editReminder(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Reminder Not Found" });
  }

  const { title, body, dateAndTime } = req.body;

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const reminder = await Reminder.findOneAndUpdate(
    { HOA: hoaID, _id: id },
    {
      HOA: hoaID,
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
//TODO: get hoa id from auth instead of body
async function deleteReminder(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Reminder Not Found" });
  }

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const reminder = await Reminder.findOneAndDelete({ HOA: hoaID, _id: id });
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
