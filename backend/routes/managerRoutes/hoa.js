const express = require("express");

// controller functions
const {
  signup,
  login,
  getAllDetails,
  editHoa,
  deleteHoa,
} = require("../../controllers/hoaControllers");

const router = express.Router();

//Create a hoa (signup)
router.post("/signup", signup);

//login as hoa manager
router.post("/login", login);

//Get the hoa info
router.get("/", getAllDetails);

//Edit the HOA info
router.patch("/", editHoa);

//Delete the HOA and close the account
router.delete("/", deleteHoa);

module.exports = router;
