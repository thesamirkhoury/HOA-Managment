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

//Get sum of expenses by a specified time period
//TODO: get hoa id from auth instead of body
async function getSum(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const { from, to } = req.body;

  //create date from request body
  const startDate = new Date(from);
  let endDate = new Date(to);

  // search for all the bills,created by th HOA ID grouped by updated at month, (with the status of paid)
  const existingIncomes = await Billing.aggregate([
    {
      $match: {
        // find paid documents from start date to end date, created by th HOA ID
        HOA: hoaID,
        updatedAt: {
          $gte: startDate,
          $lte: endDate,
        },
        paymentStatus: "Paid",
      },
    },
    {
      $group: {
        // sum the amount
        _id: { month: { $month: "$updatedAt" }, year: { $year: "$updatedAt" } },
        sum: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  let incomes = [];
  let currMonth = startDate;
  //iterate over the provided time period, if the month is available append it to the incomes array, if it is not available append a sum of zero
  while (currMonth <= endDate) {
    //search for the month in the aggregated results from the DB
    const existingIncome = existingIncomes.find(
      (income) => income._id.month === currMonth.getMonth() + 1
    );

    // check if the month is NOT available in the DB, to append a sum of zero for that month.
    if (!existingIncome) {
      incomes.push({
        date: `${currMonth.getFullYear()}-${currMonth.getMonth() + 1}`,
        sum: 0,
      });
    }
    // if the month is available in the DB, append the sum from the aggregation array.
    else {
      incomes.push({
        date: `${existingIncome._id.year}-${existingIncome._id.month}`,
        sum: existingIncome.sum,
      });
    }

    // increase the months by one
    currMonth.setMonth(currMonth.getMonth() + 1);
  }

  res.status(200).json({ incomes });
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

  const bills = await Billing.find({ HOA: hoaID, tenant: tenantID }).sort({
    createdAt: -1,
  });
  if (!bills) {
    return res.status(404).json({ error: "No Bills Found" });
  }
  res.status(200).json(bills);
}

module.exports = {
  createBill,
  getBills,
  getSum,
  editBill,
  deleteBill,
  recordPayment,
  getUserBills,
};
