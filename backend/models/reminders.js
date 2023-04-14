const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    title: {
      type: String,
      required: [true, "כותרת הינה שדה חובה"],
    },
    body: {
      type: String,
      required: [true, "תיכן הינו שדה חובה"],
    },
    dateAndTime: {
      type: Date,
      required: [true, "זמן התזכורת הינו שדה חובה"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);
