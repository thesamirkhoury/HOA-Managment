const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    title: {
      type: String,
      required: [true, "כותרת ההודעה הינה שדה חובה"],
    },
    body: {
      type: String,
      required: [true, "תוכן ההודעה הינו שדה חובה"],
    },
    buildingNumber: {
      type: Number,
      required: [true, "מספר הבניין הינו שדה חובה"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
