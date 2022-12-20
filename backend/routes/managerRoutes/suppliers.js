const express = require("express");

// controller functions
const {
  createSupplier,
  getSuppliers,
  getSupplier,
  editSupplier,
  deleteSupplier,
} = require("../../controllers/supplierControllers");

const router = express.Router();

//Create a new supplier
router.post("/", createSupplier);

//Get all suppliers
router.get("/", getSuppliers);

// Get a single supplier by _id
router.get("/:id", getSupplier);

//Edit a supplier by _id
router.patch("/:id", editSupplier);

//Delete a supplier by _id
router.delete("/:id", deleteSupplier);

module.exports = router;
