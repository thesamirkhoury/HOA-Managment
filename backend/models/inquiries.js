const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inquirySchema = new Schema(
  {
    refNumber: {
      type: Number,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    response: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquirie", inquirySchema);
