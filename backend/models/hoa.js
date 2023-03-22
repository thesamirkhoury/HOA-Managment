const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    email: {
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

// static signup method
hoaSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  address,
  membersMonthlyFee
) {
  // check if the email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // signup the new user
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    address,
    membersMonthlyFee,
  });
  return user;
};

module.exports = mongoose.model("HOA", hoaSchema);
