const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    HOA: {
      type: String,
      required: true,
    },
    refNumber: {
      type: Number,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
