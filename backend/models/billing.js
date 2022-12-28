const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billingSchema = new Schema(
  {
    HOA: {
      type: String,
      required: [true, "HOA is required"],
    },
    tenant: {
      type: String,
      required: [true, "Tenant ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Bill Amount is required"],
    },
    description: {
      type: String,
      required: [true, "Item Description is required"],
    },
    paymentType: {
      type: String,
      required: [true, "Payment Time is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due Date is required"],
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment Status is required"],
    },
    paymentDetails: {
      // records the payment method details (for Credit card, it stores 4 digits and EXP.), and "paymentDate" field.
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
