const express = require("express");

// hoa controller functions
const {
  signup: signupBoard,
  login: loginBoard,
  forgotPassword: forgotPasswordBoard,
  resetPassword: resetPasswordBoard,
} = require("../controllers/hoaControllers");

// tenant controller functions
const {
  login: loginTenant,
  resetPassword: resetPasswordTenant,
  forgotPassword: forgotPasswordTenants,
} = require("../controllers/tenantControllers");

const router = express.Router();

//* Managers
//create a hoa (signup)
router.post("/managers/signup", signupBoard);
//login as hoa manager
router.post("/managers/login", loginBoard);
//forgot password manager
router.post("/managers/forgot-password", forgotPasswordBoard);
//create password as tenant
router.put("/managers/reset-password/:resetToken", resetPasswordBoard);

//* Tenants
//login as tenant
router.post("/tenants/login", loginTenant);
//forgot password tenant
router.post("/tenants/forgot-password", forgotPasswordTenants);
//create password as tenant
router.put("/tenants/reset-password/:resetToken", resetPasswordTenant);

module.exports = router;
