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

  // search for all the expenses,created by th HOA ID grouped by created month
  const existingExpenses = await Expense.aggregate([
    {
      $match: {
        // find paid documents from start date to end date, created by th HOA ID
        HOA: hoaID,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        // sum the amount
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
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

  let expenses = [];
  let currMonth = startDate;
  //iterate over the provided time period, if the month is available append it to the expenses array, if it is not available append a sum of zero
  while (currMonth <= endDate) {
    //search for the month in the aggregated results from the DB
    const existingExpense = existingExpenses.find(
      (expense) => expense._id.month === currMonth.getMonth() + 1
    );

    // check if the month is NOT available in the DB, to append a sum of zero for that month.
    if (!existingExpense) {
      expenses.push({
        date: `${currMonth.getFullYear()}-${currMonth.getMonth() + 1}`,
        sum: 0,
      });
    }
    // if the month is available in the DB, append the sum from the aggregation array.
    else {
      expenses.push({
        date: `${existingExpense._id.year}-${existingExpense._id.month}`,
        sum: existingExpense.sum,
      });
    }

    // increase the months by one
    currMonth.setMonth(currMonth.getMonth() + 1);
  }

  res.status(200).json({ expenses });
}

//Edit an expense by _id
async function editExpense(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Expense Not Found" });
  }

  const { amount, paymentType, details, paymentCategory, paymentMethod } =
    req.body;

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
  getSum,
  editExpense,
  deleteBill,
};
