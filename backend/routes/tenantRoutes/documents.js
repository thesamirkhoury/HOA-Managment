const express = require("express");
//controller functions
const { getUserDocuments } = require("../../controllers/documentController");
const router = express.Router();

//Get all documents of a user
router.get("/", getUserDocuments);

module.exports = router;
