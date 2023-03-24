const express = require("express");

// controller functions
const {
  getAllDetails,
  editHoa,
  deleteHoa,
} = require("../../controllers/hoaControllers");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Get the hoa info
router.get("/", getAllDetails);

//Edit the HOA info
router.patch("/", editHoa);

//Delete the HOA and close the account
router.delete("/", deleteHoa);

module.exports = router;
