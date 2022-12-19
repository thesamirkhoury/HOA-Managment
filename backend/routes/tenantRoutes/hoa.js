const express = require("express");

//controller functions
const { getInfo } = require("../../controllers/hoaControllers");

const router = express.Router();

// Get the hoa info
router.get("/",getInfo);

module.exports = router;
