const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billingSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    tenant_id: {
      type: String,
      required: [true, "דייר הינו שדה חובה"],
    },
    amount: {
      type: Number,
      required: [true, "סכום החיוב הינו שדה חובה"],
    },
    description: {
      type: String,
      required: [true, "תיאור החיוב הינו שדה חובה"],
    },
    paymentType: {
      type: String,
      required: [true, "סוג התשלום הינה שדה חובה"],
    },
    dueDate: {
      type: Date,
      required: [true, "תאריך אחרון לתשלום הינו שדה חובה"],
    },
    paymentStatus: {
      type: String,
      required: [true, "שגיאה, נא לנסות שוב"],
    },
    paymentDetails: {
      // records the payment method details
      type: Object,
    },
  },
  { timestamps: true }
);

// static sum given a period of time function
billingSchema.statics.sum = async function (hoa_id, startDate, endDate) {
  if (!hoa_id || !startDate || !endDate) {
    throw Error("אחד או יותר מפרטי הועד החובה חסרים.");
  }
  // search for all the bills,created by th HOA ID grouped by updated at month, (with the status of paid)
  const existingIncomes = await this.aggregate([
    {
      $match: {
        // find paid documents from start date to end date, created by th HOA ID
        hoa_id: hoa_id.toString(),
        updatedAt: {
          $gte: startDate,
          $lte: endDate,
        },
        paymentStatus: "שולם",
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
  return incomes;
};
module.exports = mongoose.model("Billing", billingSchema);
