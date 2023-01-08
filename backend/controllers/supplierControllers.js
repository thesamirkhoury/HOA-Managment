const Supplier = require("../models/suppliers");
const mongoose = require("mongoose");

//* Managers

//Create a new supplier
//TODO: get hoa id from auth instead of body
async function createSupplier(req, res) {
  const { supplierName, supplierType, supplierCategory, email, phoneNumber } =
    req.body;
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  try {
    const supplier = await Supplier.create({
      HOA: hoaID,
      supplierName,
      supplierType,
      supplierCategory,
      email,
      phoneNumber,
    });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all suppliers
//TODO: get hoa id from auth instead of body
async function getSuppliers(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const suppliers = await Supplier.find({ HOA: hoaID });

  if (!suppliers) {
    return res.status(404).json({ error: "No Suppliers Found" });
  }
  res.status(200).json(suppliers);
}

//Get a single supplier by _id
//TODO: get hoa id from auth instead of body
async function getSupplier(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Supplier Not Found" });
  }

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const supplier = await Supplier.find({ HOA: hoaID, _id: id });

  if (!supplier) {
    return res.status(404).json({ error: "No Suppliers Found" });
  }
  res.status(200).json(supplier);
}

//Edit a supplier by _id
//TODO: get hoa id from auth instead of body
async function editSupplier(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Supplier Not Found" });
  }

  const { supplierName, supplierType, supplierCategory, email, phoneNumber } =
    req.body;

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const supplier = await Supplier.findOneAndUpdate(
    { HOA: hoaID, _id: id },
    {
      HOA: hoaID,
      supplierName,
      supplierType,
      supplierCategory,
      email,
      phoneNumber,
    },
    { new: true }
  );

  if (!supplier) {
    return res.status(404).json({ error: "No Suppliers Found" });
  }
  res.status(200).json(supplier);
}

//Delete a supplier by _id
//TODO: get hoa id from auth instead of body
async function deleteSupplier(req, res) {
  const { id } = req.params;
  // check if supplier id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Supplier Not Found" });
  }

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const supplier = await Supplier.findOneAndDelete({HOA:hoaID, _id:id});
    if (!supplier) {
      return res.status(404).json({ error: "Supplier Not Found" });
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
