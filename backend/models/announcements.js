const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    HOA: {
      type: String,
      required: [true, "HOA is required"],
    },
    title: {
      type: String,
      required: [true, "Announcement Title is required"],
    },
    body: {
      type: String,
      required: [true, "Announcement Body is required"],
    },
    buildingNumber: {
      type: String,
      required: [true, "Building Number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
