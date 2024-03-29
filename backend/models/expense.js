const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    supplier_id: {
      type: String,
      required: [true, "ספק הינו שדה חובה"],
    },
    amount: {
      type: Number,
      required: [true, "סכום ההוצאה הינו שדה חובה"],
    },
    paymentType: {
      type: String,
      required: [true, "סוג התשלום הינה שדה חובה"],
    },
    details: {
      type: String,
      required: [true, "תיאור ההוצאה הינו שדה חובה"],
    },
    paymentMethod: {
      type: String,
      required: [true, "שיטת התשלום הינה שדה חובה"],
    },
    paymentDate: {
      type: Date,
      required: [true, "תאריך ההוצאה הינו שדה חובה"],
    },
  },
  { timestamps: true }
);

// static sum given a period of time function
expenseSchema.statics.sum = async function (hoa_id, startDate, endDate) {
  if (!hoa_id || !startDate || !endDate) {
    throw Error("אחד או יותר מפרטי הועד החובה חסרים.");
  }
  // search for all the expenses,created by th HOA ID grouped by created month
  const existingExpenses = await this.aggregate([
    {
      $match: {
        // find paid documents from start date to end date, created by th HOA ID
        hoa_id: hoa_id.toString(),
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        // sum the amount
        _id: {
          month: { $month: "$paymentDate" },
          year: { $year: "$paymentDate" },
        },
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
  return expenses;
};
module.exports = mongoose.model("Expense", expenseSchema);
