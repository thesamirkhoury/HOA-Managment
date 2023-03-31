const express = require("express");
// controller functions
const {
  getTenant,
  editDetails,
} = require("../../controllers/tenantControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Get tenant details
router.get("/", getTenant);

//Edit the info of the tenant
router.patch("/", editDetails);

module.exports = router;
