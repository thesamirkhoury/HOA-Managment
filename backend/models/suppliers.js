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

//creating unique compound index - supplier and hoa_id
supplierSchema.index({ hoa_id: 1, supplierName: 1 }, { unique: true });

module.exports = mongoose.model("supplier", supplierSchema);
