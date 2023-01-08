const mongoose = require("mongoose");

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
    tenantEmail: {
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
      required: [true,"Owner Email is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
