const express = require("express");
// controller functions
const {
  login,
  getTenant,
  editTenant,
} = require("../../controllers/tenantControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Get tenant details
router.get("/", getTenant);

//Edit the info of the tenant
router.patch("/", editTenant);

module.exports = router;
