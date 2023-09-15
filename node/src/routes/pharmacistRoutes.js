const express = require("express");
const {
  getPharmacist,
  addMedicine,
  getMedicine,
  giveMedicine,
  getPatients
} = require("../controllers/pharmacistController");
const { protect } = require("../middleware");
const router = express.Router();

router.get("/", getPharmacist);
router.post("/medicine", protect, addMedicine);
router.get("/medicine", protect, getMedicine);
router.post("/provide-medicine", protect, giveMedicine);
router.get("/patient", protect, getPatients);

module.exports = router;
