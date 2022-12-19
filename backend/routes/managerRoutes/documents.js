const express = require("express");

const router = express.Router();

//Create a new document
router.post("/", (req, res) => {
  res.json({ description: "Create a new document" });
});

//Get all documents
router.get("/", (req, res) => {
  res.json({ description: "Get all documents" });
});

//Edit an existing document by _id
router.patch("/:id", (req, res) => {
  res.json({ description: "Edit an existing document by _id" });
});

//Delete an existing document by _id
router.delete("/:id", (req, res) => {
  res.json({ description: "Delete an existing document by _id" });
});

module.exports = router;
