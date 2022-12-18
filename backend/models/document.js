const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileDescription: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
    file: {
      //TODO: Refine in the next stage.
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
