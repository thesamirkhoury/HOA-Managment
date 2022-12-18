const express = require("express");

const router = express.Router();

// http://localhost:4000/api/managers/
const Association = require("../models/hoaModel");

//* HOA details
//Create a hoa (signup)
router.post("/signup", async (req, res) => {
  // res.json({ description: "Sign up and Create a new HOA" });
  //! This is just for testing
  const { firstName, lastName, managerEmail, password, membersMonthlyFee } =
    req.body;
  try {
    const newHoa = await Association.create({
      hoaDetails: {
        firstName,
        lastName,
        managerEmail,
        password,
        membersMonthlyFee,
      },
    });
    res.status(200).json(newHoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//login as hoa manager
router.post("/login", (req, res) => {
  res.json({ description: "login as hoa manager" });
});
//Delete the HOA and close the account
router.delete("/delete", (req, res) => {
  res.json({ description: "Delete the HOA and close the account" });
});
//Get the hoa info
router.get("/hoa", (req, res) => {
  res.json({ description: "Get the hoa info" });
});
//Edit the HOA info
router.patch("/hoa", (req, res) => {
  res.json({ description: "Edit the HOA info" });
});

//* Tenants
//Create a new tenant
router.post("/tenants", (req, res) => {
  res.json({ description: "Create a new tenant" });
});
//Get all tenants of an HOA
router.get("/tenants", (req, res) => {
  res.json({ description: "Get all tenants of a HOA" });
});
//Get one tenant by _id
router.get("/tenants/:id", (req, res) => {
  res.json({ description: "Get one tenant by _id" });
});
//Edit a tenant by _id
router.patch("/tenants/:id", (req, res) => {
  res.json({ description: "Edit a tenant by _id" });
});
//Delete a tenant by _id
router.delete("/tenants/:id", (req, res) => {
  res.json({ description: "Delete a tenant by _id" });
});

//* Suppliers
//Create a new supplier
router.post("/suppliers", (req, res) => {
  res.json({ description: "Create a new supplier" });
});
//Get all suppliers
router.get("/suppliers", (req, res) => {
  res.json({ description: "Get all suppliers" });
});
//Get one supplier by _id
router.get("/suppliers/:id", (req, res) => {
  res.json({ description: "Get one supplier by _id" });
});
//Edit a supplier by _id
router.patch("/suppliers/:id", (req, res) => {
  res.json({ description: "Edit a supplier by _id" });
});
//Delete a supplier by _id
router.delete("/suppliers/:id", (req, res) => {
  res.json({ description: "Delete a supplier by _id" });
});

//* Maintenance Reminders
//Create a new reminder
router.post("/reminders", (req, res) => {
  res.json({ description: "Create a new reminder" });
});
//Get all reminders
router.get("/reminders", (req, res) => {
  res.json({ description: "Get all reminders" });
});
//Edit a reminder by _id
router.patch("/reminders/:id", (req, res) => {
  res.json({ description: "Edit a reminder by _id" });
});
//Delete a reminder by _id
router.delete("/reminders/:id", (req, res) => {
  res.json({ description: "Delete a reminder by _id" });
});

//* Announcements
//Create a new announcement
router.post("/announcements", (req, res) => {
  res.json({ description: "Create a new announcement" });
});
//Get all reminders
router.get("/announcements", (req, res) => {
  res.json({ description: "Get all announcements" });
});
//Edit an announcement by _id
router.patch("/announcements/:id", (req, res) => {
  res.json({ description: "Edit an announcement by _id" });
});
//Delete an announcement by _id
router.delete("/announcements/:id", (req, res) => {
  res.json({ description: "Delete an announcement by _id" });
});

//* Maintenance Requests
//Get all maintenance requests
router.get("/maintenance", (req, res) => {
  res.json({ description: "Get all maintenance requests" });
});
//Get one maintenance requests by _id
router.get("/maintenance/:id", (req, res) => {
  res.json({ description: "Get one maintenance requests by _id" });
});
//Add a response to a maintenance requests by _id
router.patch("/maintenance/:id/response", (req, res) => {
  res.json({ description: "Add a response to a maintenance requests by _id" });
});
//Forward request by _id to a supplier by email
router.post("/maintenance/:id/forward/:email", (req, res) => {
  res.json({ description: "Forward request by _id to a supplier by email" });
});

//* Inquiries
//Get all inquiries
router.get("/inquiries", (req, res) => {
  res.json({ description: "Get all inquiries" });
});
//Get one inquiry by _id
router.get("/inquiries/:id", (req, res) => {
  res.json({ description: "Get one inquiry by _id" });
});
//Add a response to an inquiry by _id
router.patch("/inquiries/:id/response", (req, res) => {
  res.json({ description: "Add a response to an inquiry by _id" });
});

//* Billing
//Create a new bill and send by mail
router.post("/billing", (req, res) => {
  res.json({ description: "Create a new bill and send by mail" });
});
//Get all bills
router.get("/billing", (req, res) => {
  res.json({ description: "Get all bills" });
});
//Get the sum of all paid bills by a specific month
router.get("/billing/sum/:month", (req, res) => {
  res.json({
    description: "Get the sum of all paid bills by a specific month",
  });
});
//Edit a bill by _id
router.patch("/billing/:id", (req, res) => {
  res.json({ description: "Edit a bill by _id" });
});
//Delete a bill by _id
router.delete("/billing/:id", (req, res) => {
  res.json({ description: "Delete a bill by _id" });
});
//Add a payment record to an existing bill by _id
router.patch("/billing/:id/payment", (req, res) => {
  res.json({ description: "Add a payment record to an existing bill by _id" });
});
//Send email reminder by mail to pay the bill by _id
router.post("/billing/:id/reminder", (req, res) => {
  res.json({
    description: "Send email reminder by mail to pay the bill by _id",
  });
});

//* Expenses
//Create a new expense
router.post("/expenses", (req, res) => {
  res.json({ description: "Create a new expense" });
});
//Get all expenses
router.get("/expenses", (req, res) => {
  res.json({ description: "Get all expenses" });
});
//Get sum of expenses by month
router.get("/expenses/sum/:month", (req, res) => {
  res.json({ description: "Get sum of expenses by month" });
});
//Edit an expense by _id
router.patch("/expenses/:id", (req, res) => {
  res.json({ description: "Edit an expense by _id" });
});
//Delete an expense by _id
router.delete("/expenses/:id", (req, res) => {
  res.json({ description: "Delete an expense by _id" });
});

//* Documents
//Create a new document
router.post("/documents", (req, res) => {
  res.json({ description: "Create a new document" });
});
//Get all documents
router.get("/documents", (req, res) => {
  res.json({ description: "Get all documents" });
});
//Edit an existing document by _id
router.patch("/documents/:id", (req, res) => {
  res.json({ description: "Edit an existing document by _id" });
});
//Delete an existing document by _id
router.delete("/documents/:id", (req, res) => {
  res.json({ description: "Delete an existing document by _id" });
});

module.exports = router;
