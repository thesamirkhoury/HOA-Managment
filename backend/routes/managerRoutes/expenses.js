const express = require("express");
//controller functions
const {
  createExpense,
  getExpenses,
  getSumManager,
  editExpense,
  deleteBill,
} = require("../../controllers/expenseControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Create a new expense
router.post("/", createExpense);

//Get all expenses
router.get("/", getExpenses);

//Get sum of expenses by a specified time period
router.get("/sum/:from/:to", getSumManager);

//Edit an expense by _id
router.patch("/:id", editExpense);

//Delete an expense by _id
router.delete("/:id", deleteBill);

module.exports = router;
