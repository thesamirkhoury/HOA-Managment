const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    HOA: {
      type: String,
      required: [true, "HOA is required"],
    },
    title: {
      type: String,
      required: [true, "Reminder Title is required"],
    },
    body: {
      type: String,
      required: [true, "Reminder Body is required"],
    },
    dateAndTime: {
      type: Date,
      required: [true, "Reminder Date and Time is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);
