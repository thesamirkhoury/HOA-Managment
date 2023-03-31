const express = require("express");
//controller functions
const { getUserBills } = require("../../controllers/billingControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Get all bills for a user
router.get("/", getUserBills);

//Get an invoice pdf based on bill _id
router.get("/:id/invoice", (req, res) => {
  res.json({ description: "Get an invoice pdf based on bill _id" });
});

module.exports = router;
