const express = require("express");

// hoa controller functions
const {
  signup: signupBoard,
  login: loginBoard,
} = require("../controllers/hoaControllers");

// tenant controller functions
const {
  login: loginTenant,
  createPassword,
} = require("../controllers/tenantControllers");

const router = express.Router();

//* Managers
//create a hoa (signup)
router.post("/managers/signup", signupBoard);
//login as hoa manager
router.post("/managers/login", loginBoard);

//* Tenants
//login as tenant
router.post("/tenants/login", loginTenant);
//create password as tenant
router.put("/tenants/password/:resetToken", createPassword);

module.exports = router;
