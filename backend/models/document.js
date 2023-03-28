const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "HOA is required"],
    },
    fileName: {
      type: String,
      required: [true, "File Name is required"],
    },
    fileDescription: {
      type: String,
      required: [true, "File Description is required"],
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
