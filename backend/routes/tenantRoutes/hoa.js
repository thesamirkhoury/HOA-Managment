const express = require("express");
//controller functions
const { getInfo } = require("../../controllers/hoaControllers");
//auth middleware
const requireAuthTenant = require("../../middleware/requireAuthTenant");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthTenant);

// Get the hoa info
router.get("/", getInfo);

module.exports = router;
