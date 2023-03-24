const express = require("express");
// controller functions
const {
  getTenants,
  editTenant,
  deleteTenant,
} = require("../../controllers/tenantControllers");
const router = express.Router();

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

module.exports = router;
