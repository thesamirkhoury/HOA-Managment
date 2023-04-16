const express = require("express");
// controller functions
const {
  getTenant,
  editDetails,
  changePassword,
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

//Change Password
router.put("/change-password", changePassword);

module.exports = router;
