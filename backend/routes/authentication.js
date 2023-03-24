const express = require("express");

// hoa controller functions
const {
  signup: signupBoard,
  login: loginBoard,
} = require("../controllers/hoaControllers");

// tenant controller functions
const {
  signup: signupTenant,
  login: loginTenant,
} = require("../controllers/tenantControllers");

const router = express.Router();

//* Manager
//Create a hoa (signup)
router.post("/managers/signup", signupBoard);
//login as hoa manager
router.post("/managers/login", loginBoard);

//* Tenant
//Create a new tenant (signup)
router.post("/tenants/signup", signupTenant);
//login as tenant
router.post("/tenants/login", loginTenant);

module.exports = router;
