const Announcement = require("../models/announcements");
const Billing = require("../models/billing");
const Document = require("../models/document");
const Expense = require("../models/expense");
const Inquirie = require("../models/inquiries");
const MaintenanceRequest = require("../models/maintenance");
const Reminder = require("../models/reminders");
const Supplier = require("../models/suppliers");
const Tenant = require("../models/tenants");
const HOA = require("../models/hoa");
const { sendCloseAccount } = require("../util/email");

async function closeAccount(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const hoa = await HOA.findByIdAndDelete(hoa_id);
  if (!hoa) {
    return res.status(404).json({
      error: "לא הצלחנו לסגור את החשבון שלך, נא להסות שוב או לפנות לתמיכה.",
    });
  }
  await Announcement.deleteMany({ hoa_id });
  await Billing.deleteMany({ hoa_id });
  await Document.deleteMany({ hoa_id });
  await Expense.deleteMany({ hoa_id });
  await Inquirie.deleteMany({ hoa_id });
  await MaintenanceRequest.deleteMany({ hoa_id });
  await Reminder.deleteMany({ hoa_id });
  await Supplier.deleteMany({ hoa_id });
  await Tenant.deleteMany({ hoa_id });

  sendCloseAccount(hoa.email, hoa.firstName);
  res.status(200).json(hoa);
}

module.exports = { closeAccount };
