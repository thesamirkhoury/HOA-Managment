const express = require("express");

// controller functions
const {
  getAllDetails,
  editHoa,
  changePassword,
  deleteHoa,
} = require("../../controllers/hoaControllers");
const { closeAccount } = require("../../controllers/closeAccount");

//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Get the hoa info
router.get("/", getAllDetails);

//Edit the HOA info
router.patch("/", editHoa);

//Change Password
router.put("/change-password", changePassword);

//Delete the HOA and close the account
router.delete("/", closeAccount);

module.exports = router;
