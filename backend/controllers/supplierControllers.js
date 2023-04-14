const Supplier = require("../models/suppliers");
const mongoose = require("mongoose");

//* Managers

//Create a new supplier
async function createSupplier(req, res) {
  const { supplierName, supplierType, supplierCategory, email, phoneNumber } =
    req.body;

  //Validation
  if (
    !supplierName ||
    !supplierType ||
    !supplierCategory ||
    !email ||
    !phoneNumber
  ) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  // hoa id from auth
  const hoa_id = req.user._id;

  try {
    const supplier = await Supplier.create({
      hoa_id,
      supplierName,
      supplierType,
      supplierCategory,
      email,
      phoneNumber,
    });
    res.status(200).json(supplier);
  } catch (error) {
    // handle unique compound index error message
    if (error.code === 11000) {
      return res.status(400).json({ error: "הספק כבר קיים במערכת" });
    }
    res.status(400).json({ error: error.message });
  }
}

//Get all suppliers
async function getSuppliers(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const suppliers = await Supplier.find({ hoa_id });
  if (!suppliers) {
    return res.status(404).json({ error: "לא נמצאו ספקים." });
  }
  res.status(200).json(suppliers);
}

//Get a single supplier by _id
async function getSupplier(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ספק זה אינו קמיית במערכת." });
  }
  const supplier = await Supplier.findById(id);
  if (!supplier) {
    return res.status(404).json({ error: "לא נמצאו ספקים." });
  }
  res.status(200).json(supplier);
}

//Edit a supplier by _id
async function editSupplier(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ספק זה אינו קמיית במערכת." });
  }
  const { supplierName, supplierType, supplierCategory, email, phoneNumber } =
    req.body;

  const supplier = await Supplier.findByIdAndUpdate(
    id,
    {
      supplierName,
      supplierType,
      supplierCategory,
      email,
      phoneNumber,
    },
    { new: true }
  );

  if (!supplier) {
    return res.status(404).json({ error: "לא נמצאו ספקים." });
  }
  res.status(200).json(supplier);
}

//Delete a supplier by _id
async function deleteSupplier(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ספק זה אינו קמיית במערכת." });
  }
  const supplier = await Supplier.findByIdAndDelete(id);
  if (!supplier) {
    return res.status(404).json({ error: "ספק זה אינו קמיית במערכת." });
  }
  res.status(200).json(supplier);
}

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplier,
  editSupplier,
  deleteSupplier,
};
