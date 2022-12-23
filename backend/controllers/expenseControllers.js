const Expense = require("../models/expense");
const mongoose = require("mongoose");

//* Managers

//Create a new expense
//TODO: get hoa id from auth instead of body
async function createExpense(req, res) {
  const {
    payableTo,
    amount,
    paymentType,
    details,
    paymentCategory,
    paymentMethod,
  } = req.body;
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  //check of tenant id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(payableTo)) {
    return res.status(404).json({ error: "Supplier Not Found" });
  }
  try {
    const expense = await Expense.create({
      HOA: hoaID,
      payableTo,
      amount,
      paymentType,
      details,
      paymentCategory,
      paymentMethod,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all expenses
//TODO: get hoa id from auth instead of body
async function getExpenses(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const expenses = await Expense.find({ HOA: hoaID }).sort({ createdAt: -1 });
  if (!expenses) {
    return res.status(404).json({ error: "No Expenses Found" });
  }
  res.status(200).json(expenses);
}

//Get sum of expenses by a specified time period
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
  const expenses = await Expense.aggregate([
    {
      $match: {
        // find paid documents from start date to end date
        createdAt: {
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

  if (!expenses) {
    return res.status(404).json({ error: "No Expenses Found" });
  }
  res.status(200).json({
    startDate,
    endDate,
    sum: expenses[0].sum,
  });
}

//Edit an expense by _id
async function editExpense(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Expense Not Found" });
  }

  const {
    amount,
    paymentType,
    details,
    paymentCategory,
    paymentMethod,
  } = req.body;

  const expense = await Expense.findByIdAndUpdate(
    id,
    { amount, paymentType, details, paymentCategory, paymentMethod },
    { new: true }
  );
  if (!expense) {
    return res.status(404).json({ error: "Expense Not Found" });
  }
  res.status(200).json(expense);
}

//Delete an expense by _id
async function deleteBill(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Expense Not Found" });
  }

  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    return res.status(404).json({ error: "Expense Not Found" });
  }
  res.status(200).json(expense);
}

module.exports = {
  createExpense,
  getExpenses,
  getSumMonths,
  editExpense,
  deleteBill,
};