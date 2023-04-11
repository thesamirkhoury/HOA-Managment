const Billing = require("../models/billing");
const mongoose = require("mongoose");

//* Managers

//Create a new bill and send by mail
//TODO: Implement send By Mail
async function createBill(req, res) {
  const { tenant_id, amount, description, paymentType, dueDate } = req.body;
  //check of tenant id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(tenant_id)) {
    return res.status(404).json({ error: "Tenant Not Found" });
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
      paymentDate: undefined,
    });
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
    return res.status(404).json({ error: "No Bills Found" });
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
    return res.status(404).json({ error: "Bill Not Found" });
  }

  const { tenant_id, amount, description, paymentType, dueDate } = req.body;

  const bill = await Billing.findByIdAndUpdate(
    id,
    { tenant_id, amount, description, paymentType, dueDate },
    { new: true }
  );
  if (!bill) {
    return res.status(404).json({ error: "Bill Not Found" });
  }
  res.status(200).json(bill);
}

//Delete a bill by _id
async function deleteBill(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Bill Not Found" });
  }

  const bill = await Billing.findByIdAndDelete(id);
  if (!bill) {
    return res.status(404).json({ error: "Bill Not Found" });
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
    return res.status(404).json({ error: "Bill Not Found" });
  }
  res.status(200).json(bill);
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
    return res.status(404).json({ error: "No Bills Found" });
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
  getUserBills,
  getSumTenant,
};
