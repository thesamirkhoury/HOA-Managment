const express = require("express");
// controller functions
const {
  login,
  getTenant,
  editTenant,
} = require("../../controllers/tenantControllers");

const router = express.Router();

//Get tenant details
router.get("/", getTenant);

//Edit the info of the tenant
router.patch("/", editTenant);

module.exports = router;
