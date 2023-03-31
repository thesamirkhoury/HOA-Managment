const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "HOA is required"],
    },
    supplierName: {
      type: String,
      required: [true, "Supplier Name is required"],
      unique: true,
    },
    supplierType: {
      // Type is either a "Company" OR an "Independent Contractor"
      type: String,
      required: [true, "Supplier Type is required"],
    },
    supplierCategory: {
      type: String,
      required: [true, "Supplier Type is required"],
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
