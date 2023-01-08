const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    HOA: {
      type: String,
      required: [true, "HOA is required"],
    },
    tenant: {
      type: String,
      required: [true, "Tenant ID is required"],
    },
    subject: {
      type: String,
      required: [true, "Maintenance Request Subject is required"],
    },
    description: {
      type: String,
      required: [true, "Maintenance Request Description is required"],
    },
    status: {
      type: String,
      required: [true, "Maintenance Request Status is required"],
    },
    pictures: {
      //TODO: Refine in the next stage.
      type: Buffer,
    },
    response: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", requestSchema);
