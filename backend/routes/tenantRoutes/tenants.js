const express = require("express");

const router = express.Router();

//login as a tenant
router.post("/login", (req, res) => {
  res.json({ description: "login as a tenant" });
});

//Edit the info of the tenant
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit the info of the tenant" });
});

module.exports = router;
