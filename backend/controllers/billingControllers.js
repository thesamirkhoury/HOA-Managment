const Billing = require("../models/billing");
const mongoose = require("mongoose");

//* Managers

//Create a new bill and send by mail
//TODO: get hoa id from auth instead of body
//TODO: Implement send By Mail
async function createBill(req, res) {
  const { tenant, amount, description, paymentType, dueDate } = req.body;
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  //check of tenant id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(tenant)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }
  try {
    const bill = await Billing.create({
      HOA: hoaID,
      tenant,
      amount,
      description,
      paymentType,
      dueDate,
      paymentStatus: "Not Paid",
      paymentDetails: {},
      paymentDate: undefined,
    });
    res.status(200).json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all bills
//TODO: get hoa id from auth instead of body
async function getBills(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const bills = await Billing.find({ HOA: hoaID }).sort({ createdAt: -1 });
  if (!bills) {
    return res.status(404).json({ error: "No Bills Found" });
  }
  res.status(200).json(bills);
}

//Get the sum of all paid bills by a specific time period
//TODO: get hoa id from auth instead of body
async function getSumMonths(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const { from, to } = req.body;

  //create date from request body
  const startDate = new Date(from);
  const endDate = new Date(to);

  // find the relevant documents, and sum the amount
  const bills = await Billing.aggregate([
    {
      $match: {
        // find paid documents from start date to end date
        paymentDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        // sum the amount
        _id: null,
        sum: { $sum: "$amount" },
      },
    },
  ]);

  if (!bills) {
    return res.status(404).json({ error: "No Bills Found" });
  }
  res.status(200).json({
    startDate,
    endDate,
    sum: bills[0].sum,
  });
}

//Edit a bill by _id
async function editBill(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Bill Not Found" });
  }

  const { amount, description, paymentType, dueDate } = req.body;

  const bill = await Billing.findByIdAndUpdate(
    id,
    { amount, description, paymentType, dueDate },
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
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Bill Not Found" });
  }

  // payment details, and "paymentDate" field.
  const { paymentRecord } = req.body;

  const bill = await Billing.findByIdAndUpdate(
    id,
    {
      paymentStatus: "Paid",
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
//TODO: get tenant id, hoa id from auth instead of body
async function getUserBills(req, res) {
  // get hoa id from user auth
  const { hoaID, tenantID } = req.body; //change to auth id
  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  const bills = await Billing.find({ HOA: hoaID, tenant: tenantID }).sort({createdAt: -1});
  if (!bills) {
    return res.status(404).json({ error: "No Bills Found" });
  }
  res.status(200).json(bills);
}

module.exports = {
  createBill,
  getBills,
  getSumMonths,
  editBill,
  deleteBill,
  recordPayment,
  getUserBills,
};
