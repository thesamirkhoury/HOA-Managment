const express = require("express");
//controller functions
const { getUserDocuments } = require("../../controllers/documentController");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

//Get all documents of a user
router.get("/", getUserDocuments);

module.exports = router;
