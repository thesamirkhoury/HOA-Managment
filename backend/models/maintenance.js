const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    tenant_id: {
      type: String,
      required: [true, "דייר הינו שדה חובה"],
    },
    subject: {
      type: String,
      required: [true, "כותרת קריאת השירות הינה שדה חובה"],
    },
    description: {
      type: String,
      required: [true, "תיאור קראית השירות הינו שדה חובה"],
    },
    status: {
      type: String,
      required: [true, "שגיאה, נא לנסות שוב"],
    },
    picturePath: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", requestSchema);
