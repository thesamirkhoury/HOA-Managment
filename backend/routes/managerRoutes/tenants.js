const express = require("express");
// controller functions
const {
  getTenants,
  editTenant,
  deleteTenant,
} = require("../../controllers/tenantControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Get all tenants of an HOA
router.get("/", getTenants);

//Get one tenant by _id
router.get("/:id", (req, res) => {
  res.json({ description: "Get one tenant by _id" });
});

//Edit a tenant by _id
router.patch("/:id", editTenant);

//Delete a tenant by _id
router.delete("/:id", deleteTenant);

//Create a new tenant (signup)
router.post("/signup", signupTenant);

module.exports = router;
