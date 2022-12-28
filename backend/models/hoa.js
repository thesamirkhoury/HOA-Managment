const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hoaSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Manager First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Manager Last Name is required"],
    },
    managerEmail: {
      type: String,
      required: [true, "Manager's Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
      required: [true, "HOA Address is required"],
    },
    membersMonthlyFee: {
      type: String,
      required: [true, "HOA Monthly Fee is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HOA", hoaSchema);
