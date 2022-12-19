const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    HOA: {
      type: String,
      required: true,
    },
    refNumber: {
      type: Number,
      required: true,
    },
    payableTo: {
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
    details: {
      type: String,
      required: true,
    },
    paymentCategory: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
