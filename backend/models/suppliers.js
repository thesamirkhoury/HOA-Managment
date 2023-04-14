const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    supplierName: {
      type: String,
      required: [true, "שם ספק הינו חובה"],
      unique: true,
    },
    supplierType: {
      // Type is either a "Company" OR an "Independent Contractor"
      type: String,
      required: [true, "סוג ספק  הינו שדה חובה"],
    },
    supplierCategory: {
      type: String,
      required: [true, "תחום ספק הינו שדה חובה"],
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
