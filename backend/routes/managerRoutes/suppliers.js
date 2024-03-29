const express = require("express");

// controller functions
const {
  createSupplier,
  getSuppliers,
  editSupplier,
  deleteSupplier,
} = require("../../controllers/supplierControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Create a new supplier
router.post("/", createSupplier);

//Get all suppliers
router.get("/", getSuppliers);

//Edit a supplier by _id
router.patch("/:id", editSupplier);

//Delete a supplier by _id
router.delete("/:id", deleteSupplier);

module.exports = router;
