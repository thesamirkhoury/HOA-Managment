const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

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
    token: {
      type: String,
    },
    tokenExpire: {
      type: Date,
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

// static forgot password method
// TODO: Change Error messages to hebrew
hoaSchema.statics.forgotPassword = async function (email) {
  // validation
  if (!email) {
    throw Error("Email is required to reset your password");
  }

  // check if email exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  //create a random token
  const token = crypto.randomBytes(20).toString("hex");
  //hashing the token
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(token, salt);

  user.token = hash;
  user.tokenExpire = Date.now() + 10 * (60 * 1000); //link is valid for only 10 minutes
  await user.save();

  const data = {
    email: user.email,
    token: token,
  };
  return data;
};

// static change password using a reset token method
// TODO: Change Error messages to hebrew
hoaSchema.statics.resetPassword = async function (resetToken, password) {
  // validation
  if (!resetToken || !password) {
    throw Error("All fields must be filled");
  }

  //hash salt
  const salt = await bcrypt.genSalt(10);

  // hash the token and compare to the DB
  const tokenHash = await bcrypt.hash(resetToken, salt);
  const user = await this.findOne({
    tokenHash,
    tokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw Error("Invalid Token, try requesting a new password reset");
  }

  // hash the password
  const hash = await bcrypt.hash(password, salt);

  // update the password and revoke the token
  user.password = hash;
  user.token = undefined;
  user.tokenExpire = undefined;
  await user.save();

  return user;
};

module.exports = mongoose.model("HOA", hoaSchema);
