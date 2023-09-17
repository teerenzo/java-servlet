const express = require("express");
const {
  getPatients,
  getPhysicians,
  giveConsultation,
} = require("../controllers/physicianController");
const { protect } = require("../middleware");
const router = express.Router();

router.get("/patient", protect, getPatients);
router.get("/", getPhysicians);
router.post("/consultation", protect, giveConsultation);

module.exports = router;
