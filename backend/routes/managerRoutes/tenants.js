const express = require("express");
// controller functions
const {
  signup: signupTenant,
  getTenants,
  editTenant,
  deleteTenant,
  emailUsername,
} = require("../../controllers/tenantControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Get all tenants of an HOA
router.get("/", getTenants);

//Edit a tenant by _id
router.patch("/:id", editTenant);

//Delete a tenant by _id
router.delete("/:id", deleteTenant);

//Create a new tenant (signup)
router.post("/signup", signupTenant);

router.post("/email-username/:id", emailUsername);

module.exports = router;
