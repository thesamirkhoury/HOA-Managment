const express = require("express");
//controller functions
const { getUserBills } = require("../../controllers/billingControllers");
const router = express.Router();

//Get all bills for a user
router.get("/", getUserBills);

//Get an invoice pdf based on bill _id
router.get("/:id/invoice", (req, res) => {
  res.json({ description: "Get an invoice pdf based on bill _id" });
});

module.exports = router;
