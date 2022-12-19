const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    HOA: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    supplierType: {
      type: String,
      required: true,
    },
    supplierCategory: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("supplier", supplierSchema);
