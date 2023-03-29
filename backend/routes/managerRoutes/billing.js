const express = require("express");
//controller functions
const {
  createBill,
  getBills,
  getSum,
  editBill,
  deleteBill,
  recordPayment,
} = require("../../controllers/billingControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Create a new bill and send by mail
router.post("/", createBill);

//Get all bills
router.get("/", getBills);

//Get the sum of all paid bills by a specific time period
router.get("/sum/:from/:to", getSum);

//Edit a bill by _id
router.patch("/:id", editBill);

//Delete a bill by _id
router.delete("/:id", deleteBill);

//Add a payment record to an existing bill by _id
router.post("/:id/payment", recordPayment);

//Send email reminder to pay the bill by _id
router.post("/:id/reminder", (req, res) => {
  res.json({
    description: "Send email reminder by mail to pay the bill by _id",
  });
});

module.exports = router;
