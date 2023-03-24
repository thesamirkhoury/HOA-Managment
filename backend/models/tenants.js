const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    HOA: {
      type: String,
      required: [true, "HOA is required"],
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
    tenantPhoneNumber: {
      type: String,
      required: [true, "Tenant Phone Number is required"],
    },
    email: {
      type: String,
      required: [true, "Tenant Email is required"],
      unique: true,
    },
    password: {
      //TODO: later make it filled by a tenant on first login
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
  },
  { timestamps: true }
);

// static signup method
//TODO: Change Error messages to hebrew
tenantSchema.statics.signup = async function (
  HOA,
  firstName,
  lastName,
  buildingNumber,
  apartmentNumber,
  parkingSpot,
  tenantPhoneNumber,
  email,
  password,
  tenantType,
  ownerFirstName,
  ownerLastName,
  ownerPhoneNumber,
  ownerEmail
) {
  // validation
  if (!HOA) {
    throw Error("Tenant must be associated with a HOA");
  }
  if (
    !firstName ||
    !lastName ||
    !buildingNumber ||
    !apartmentNumber ||
    !parkingSpot ||
    !tenantPhoneNumber ||
    !email ||
    !password ||
    !tenantType ||
    !ownerFirstName ||
    !ownerLastName ||
    !ownerPhoneNumber ||
    !ownerEmail
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email) || !validator.isEmail(ownerEmail)) {
    throw Error("Email is not Valid");
  }
  //TODO: check if user exists, and handle logic

  // hash the password
  //TODO: change this to a token and send to set a password via email
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // signup the new user
  const user = await this.create({
    HOA,
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    tenantPhoneNumber,
    email,
    password: hash,
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
  });
  return user;
};

module.exports = mongoose.model("Tenant", tenantSchema);
