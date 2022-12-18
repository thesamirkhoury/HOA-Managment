const express = require("express");

const router = express.Router();

//Create a new tenant
router.post("/", (req, res) => {
  res.json({ description: "Create a new tenant (signup)" });
});

//Get all tenants of an HOA
router.get("/", (req, res) => {
  res.json({ description: "Get all tenants of an HOA" });
});

//Get one tenant by _id
router.get("/:id", (req, res) => {
  res.json({ description: "Get one tenant by _id" });
});

//Edit a tenant by _id
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit a tenant by _id" });
});

//Delete a tenant by _id
router.delete("/:id", (req, res) => {
  res.json({ description: "Delete a tenant by _id" });
});

module.exports = router;
