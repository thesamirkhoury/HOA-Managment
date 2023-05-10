const express = require("express");
//controller functions
const {
  getUserBills,
  getSumTenant,
  generateInvoice,
} = require("../../controllers/billingControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Get all bills for a user
router.get("/", getUserBills);

//Get the sum of all paid bills by a specific time period
router.get("/sum/:from/:to", getSumTenant);

//Get an invoice pdf based on bill _id
router.get("/:id/invoice", generateInvoice);

module.exports = router;
