const express = require("express");

// controller functions
const {
  getAllDetails,
  editHoa,
  deleteHoa,
} = require("../../controllers/hoaControllers");

const router = express.Router();

//Get the hoa info
router.get("/", getAllDetails);

//Edit the HOA info
router.patch("/", editHoa);

//Delete the HOA and close the account
router.delete("/", deleteHoa);

module.exports = router;
