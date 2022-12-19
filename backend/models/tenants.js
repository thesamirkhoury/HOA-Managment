const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    HOA: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    buildingNumber: {
      type: String,
      required: true,
    },
    apartmentNumber: {
      type: String,
      required: true,
    },
    parkingSpot: {
      type: String,
    },
    tenantPhoneNumber: {
      type: String,
      required: true,
    },
    tenantEmail: {
      type: String,
      required: true,
    },
    password: {
      //TODO: later make it filled by a tenant on first login
      type: String,
    },
    tenantType: {
      type: String,
      required: true,
    },
    ownerFirstName: {
      type: String,
      required: true,
    },
    ownerLastName: {
      type: String,
      required: true,
    },
    ownerPhoneNumber: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
