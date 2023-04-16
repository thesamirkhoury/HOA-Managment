const express = require("express");
//controller functions
const { getSumTenant } = require("../../controllers/expenseControllers");
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);
 
//Get the sum of all paid bills by a specific time period
router.get("/sum/:from/:to", getSumTenant);

module.exports = router;
