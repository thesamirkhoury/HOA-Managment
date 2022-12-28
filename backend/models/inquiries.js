const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inquirySchema = new Schema(
  {
    HOA: {
      type: String,
      required: [true, "HOA is required"],
    },
    tenant: {
      type: String,
      required: [true, "Tenant ID is required"],
    },
    subject: {
      type: String,
      required: [true, "Inquiry Subject is required"],
    },
    body: {
      type: String,
      required: [true, "Inquiry Body is required"],
    },
    status: {
      type: String,
      required: [true, "Inquiry Status is required"],
    },
    response: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquirie", inquirySchema);
