const Billing = require("../models/billing");
const mongoose = require("mongoose");
const { sendNewBill, sendBillReminder } = require("../util/email");

//* Managers

//Create a new bill and send by mail
async function createBill(req, res) {
  const { tenant_id, amount, description, paymentType, dueDate } = req.body;

  //Validation
  if (!tenant_id || !amount || !description || !paymentType || !dueDate) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }
  if (!mongoose.Types.ObjectId.isValid(tenant_id)) {
    //check of tenant id is a valid mongoose id
    return res.status(404).json({ error: "הדייר אינו קיים בערכת" });
  }

  // hoa id from auth
  const hoa_id = req.user._id;

  try {
    const bill = await Billing.create({
      hoa_id,
      tenant_id,
      amount,
      description,
      paymentType,
      dueDate,
      paymentStatus: "לא שולם",
      paymentDetails: undefined,
    });
    sendNewBill(tenant_id, amount);

    res.status(200).json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all bills
async function getBills(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const bills = await Billing.find({ hoa_id }).sort({ createdAt: -1 });
  if (!bills) {
    return res.status(404).json({ error: "לא נמצאו חיובים" });
  }
  res.status(200).json(bills);
}

//Get sum of expenses by a specified time period
async function getSumManager(req, res) {
  const { from, to } = req.params;
  // hoa id from auth
  const hoa_id = req.user._id;

  //create date from request body
  const startDate = new Date(from);
  let endDate = new Date(to);

  try {
    const incomes = await Billing.sum(hoa_id, startDate, endDate);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Edit a bill by _id
async function editBill(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "חיוב זה אינו קמיית במערכת." });
  }

  const { tenant_id, amount, description, paymentType, dueDate } = req.body;

  const bill = await Billing.findByIdAndUpdate(
    id,
    { tenant_id, amount, description, paymentType, dueDate },
    { new: true }
  );
  if (!bill) {
    return res.status(404).json({ error: "חיוב זה אינו קמיית במערכת." });
  }
  res.status(200).json(bill);
}

//Delete a bill by _id
async function deleteBill(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "חיוב זה אינו קמיית במערכת." });
  }

  const bill = await Billing.findByIdAndDelete(id);
  if (!bill) {
    return res.status(404).json({ error: "חיוב זה אינו קמיית במערכת." });
  }
  res.status(200).json(bill);
}

//Add a payment record to an existing bill by _id
async function recordPayment(req, res) {
  const { id } = req.params;
  // payment details, and "paymentDate" field.
  const paymentRecord = req.body;
  const bill = await Billing.findByIdAndUpdate(
    id,
    {
      paymentStatus: "שולם",
      paymentDetails: paymentRecord,
    },
    { new: true }
  );
  if (!bill) {
    return res.status(404).json({ error: "חיוב זה אינו קמיית במערכת." });
  }
  res.status(200).json(bill);
}

//Send a payment reminder by mail
async function sendReminder(req, res) {
  const { id } = req.params;

  try {
    await sendBillReminder(id);
    res.status(200).json({ message: "מייל נשלח בהצלחה" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//* Tenants

//Get all bills for a user
async function getUserBills(req, res) {
  // tenant id from auth
  const tenant_id = req.user._id;

  const bills = await Billing.find({ tenant_id }).sort({
    createdAt: -1,
  });
  if (!bills) {
    return res.status(404).json({ error: "לא נמצאו חיובים" });
  }
  res.status(200).json(bills);
}

//Get sum of expenses by a specified time period
async function getSumTenant(req, res) {
  const { from, to } = req.params;
  // hoa id from auth
  const hoa_id = req.user.hoa_id;

  //create date from request body
  const startDate = new Date(from);
  let endDate = new Date(to);

  try {
    const incomes = await Billing.sum(hoa_id, startDate, endDate);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createBill,
  getBills,
  getSumManager,
  editBill,
  deleteBill,
  recordPayment,
  sendReminder,
  getUserBills,
  getSumTenant,
};
