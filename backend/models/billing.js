const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billingSchema = new Schema(
  {
    HOA: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: Number,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentDetails: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
