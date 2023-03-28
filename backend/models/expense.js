const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "HOA is required"],
    },
    supplier_id: {
      type: String,
      required: [true, "Supplier ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Expense Amount is required"],
    },
    paymentType: {
      type: String,
      required: [true, "Payment Time is required"],
    },
    details: {
      type: String,
      required: [true, "Payment Details are required"],
    },
    paymentCategory: {
      type: String,
      required: [true, "Payment Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
