const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    fileName: {
      type: String,
      required: [true, "שם הקובץ הינו שדה חובה"],
    },
    fileDescription: {
      type: String,
      required: [true, "תיאור הקובץ הינו שדה חובה"],
    },
    file: {
      //TODO: Refine in the files handling stage.
      type: Buffer,
      required: [true, "The File is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
