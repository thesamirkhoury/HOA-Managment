const Expense = require("../models/expense");
const mongoose = require("mongoose");

//* Managers

//Create a new expense
async function createExpense(req, res) {
  const {
    supplier_id,
    amount,
    paymentType,
    details,
    paymentCategory,
    paymentMethod,
    paymentDate,
  } = req.body;
  //Validation
  if (
    !supplier_id ||
    !amount ||
    !paymentType ||
    !details ||
    !paymentCategory ||
    !paymentMethod ||
    !paymentDate
  ) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }
  //check of tenant id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(supplier_id)) {
    return res.status(404).json({ error: "הספק אינו קיים במערכת." });
  }
  // hoa id from auth
  const hoa_id = req.user._id;

  try {
    const expense = await Expense.create({
      hoa_id,
      supplier_id,
      amount,
      paymentType,
      details,
      paymentCategory,
      paymentMethod,
      paymentDate,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all expenses
async function getExpenses(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const expenses = await Expense.find({ hoa_id }).sort({ createdAt: -1 });
  if (!expenses) {
    return res.status(404).json({ error: "לא נמצאו הוצאות." });
  }
  res.status(200).json(expenses);
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
    const expenses = await Expense.sum(hoa_id, startDate, endDate);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Edit an expense by _id
async function editExpense(req, res) {
  const {
    supplier_id,
    amount,
    paymentType,
    details,
    paymentMethod,
    paymentDate,
  } = req.body;
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "הוצאה זאת אינה קמיית במערכת." });
  }

  const expense = await Expense.findByIdAndUpdate(
    id,
    {
      supplier_id,
      amount,
      paymentType,
      details,
      paymentMethod,
      paymentDate,
    },
    { new: true }
  );
  if (!expense) {
    return res.status(404).json({ error: "הוצאה זאת אינה קמיית במערכת." });
  }
  res.status(200).json(expense);
}

//Delete an expense by _id
async function deleteBill(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "הוצאה זאת אינה קמיית במערכת." });
  }

  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    return res.status(404).json({ error: "הוצאה זאת אינה קמיית במערכת." });
  }
  res.status(200).json(expense);
}

//* Tenants
//Get sum of expenses by a specified time period
async function getSumTenant(req, res) {
  const { from, to } = req.params;
  // hoa id from auth
  const hoa_id = req.user.hoa_id;

  //create date from request body
  const startDate = new Date(from);
  let endDate = new Date(to);

  try {
    const expenses = await Expense.sum(hoa_id, startDate, endDate);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createExpense,
  getExpenses,
  getSumManager,
  editExpense,
  deleteBill,
  getSumTenant,
};
