const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "HOA ID is required"],
    },
    firstName: {
      type: String,
      required: [true, "Tenant First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Tenant Last Name is required"],
    },
    buildingNumber: {
      type: String,
      required: [true, "Tenant Building Number is required"],
    },
    apartmentNumber: {
      type: String,
      required: [true, "Tenant Apartment Number is required"],
    },
    parkingSpot: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Tenant Phone Number is required"],
    },
    tenantEmail: {
      type: String,
      required: [true, "Tenant Email is required"],
    },
    username: {
      type: String,
      required: [true, "Tenant Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    tenantType: {
      // Type is either an "Owner" or a "Renter"
      type: String,
      required: [true, "Tenant Type is required"],
    },
    ownerFirstName: {
      type: String,
      required: [true, "Owner First Name is required"],
    },
    ownerLastName: {
      type: String,
      required: [true, "Owner Last Name is required"],
    },
    ownerPhoneNumber: {
      type: String,
      required: [true, "Owner Phone Number is required"],
    },
    ownerEmail: {
      type: String,
      required: [true, "Owner Email is required"],
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
tenantSchema.statics.signup = async function (
  hoa_id,
  firstName,
  lastName,
  buildingNumber,
  apartmentNumber,
  parkingSpot,
  phoneNumber,
  tenantEmail,
  username,
  tenantType,
  ownerFirstName,
  ownerLastName,
  ownerPhoneNumber,
  ownerEmail
) {
  // validation
  if (!hoa_id) {
    throw Error("Tenant must be associated with a HOA");
  }
  //check if all required values are passed
  if (
    !firstName ||
    !lastName ||
    !buildingNumber ||
    !apartmentNumber ||
    !phoneNumber ||
    !tenantEmail ||
    !username ||
    !tenantType ||
    !ownerFirstName ||
    !ownerLastName ||
    !ownerPhoneNumber ||
    !ownerEmail
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(tenantEmail) || !validator.isEmail(ownerEmail)) {
    throw Error("Email is not Valid");
  }

  // check if the email already exists
  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("Tenant already added to HOA");
  }

  //create a random token
  const token = crypto.randomBytes(20).toString("hex");
  //hashing the token
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(token, salt);

  // signup the new user
  const user = await this.create({
    hoa_id,
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    phoneNumber,
    tenantEmail,
    username,
    password: undefined, // put an undefined value for the password, to later be created by the tenant
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
    token: hash,
    tokenExpire: Date.now() + 10 * (60 * 1000), //10 minutes
  });

  //email the signup link
  //TODO: use the emil util to email a signup link with the token, temp log the token in console
  console.log(token);

  return user;
};

//static login method
//TODO: Change Error messages to hebrew
//? check error message for possibility of generic messages
tenantSchema.statics.login = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  // check if email exists
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }

  // check if the plain-text password matches the hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

// static change password according to token method
// TODO: Change Error messages to hebrew
tenantSchema.statics.setPassword = async function (resetToken, password) {
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
    throw Error("Invalid Token");
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

module.exports = mongoose.model("Tenant", tenantSchema);
