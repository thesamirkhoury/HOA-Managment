const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inquirySchema = new Schema(
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
      required: [true, "כותרת הפנייה הינה שדה חובה"],
    },
    body: {
      type: String,
      required: [true, "תוכן הפנייה הינו שדה חובה"],
    },
    status: {
      type: String,
      required: [true, "שגיאה, נא לנסות שוב"],
    },
    response: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquirie", inquirySchema);
