const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
    fileNumber: {
      type: String,
      required: [true, "HOA File Number is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

// static signup method
//TODO: Change Error messages to hebrew
hoaSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  address,
  membersMonthlyFee,
  fileNumber
) {
  // validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !address ||
    !membersMonthlyFee ||
    !fileNumber
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not Valid");
  }

  // check if the email or HOA File Number already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const fileNumberExists = await this.findOne({ fileNumber });
  if (fileNumberExists) {
    throw Error("File number already in use");
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
    fileNumber,
  });
  return user;
};

//static login method
//TODO: Change Error messages to hebrew
//? check error message for possibility of generic messages
hoaSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // check if email exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  // check if the plain-text password matches the hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("HOA", hoaSchema);
