const express = require("express");

const router = express.Router();

// Controllers
const { getDetails } = require("../controllers/detailsController");

// http://localhost:4000/api/tenants/

//* HOA details
//Get the hoa info
router.get("/hoa", getDetails);

//* Tenants
//login as a tenant
router.post("/login", (req, res) => {
  res.json({ description: "login as a tenant" });
});
//Edit the info of the tenant
router.patch("/edit", (req, res) => {
  res.json({ description: "Edit the info of the tenant" });
});

//* Announcements
//Get all the announcements
router.get("/announcements", (req, res) => {
  res.json({ description: "Get all the announcements" });
});

//* Maintenance Requests
//Create a new maintenance request
router.post("/maintenance", (req, res) => {
  res.json({ description: "Create a new maintenance request" });
});
//Get all requests for a user
router.get("/maintenance", (req, res) => {
  res.json({ description: "Get all maintenance requests for a user" });
});

//* Inquiries
//Create a new maintenance request
router.post("/inquiries", (req, res) => {
  res.json({ description: "Create a new inquiry" });
});
//Get all requests for a user
router.get("/inquiries", (req, res) => {
  res.json({ description: "Get all inquiries for a user" });
});

//* Billing
//Get all bills for a user
router.get("/billing", (req, res) => {
  res.json({ description: "Get all bills for a user" });
});
//Get an invoice pdf based on bill _id
router.get("/billing/:id/invoice", (req, res) => {
  res.json({ description: "Get an invoice pdf based on bill _id" });
});

//* Documents
//Get all documents
router.get("/documents", (req, res) => {
  res.json({ description: "Get all documents" });
});

module.exports = router;
