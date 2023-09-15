const express = require("express");
const {
  selectPhysician,
  selectPharmacy,
  getAllPatients,
  getConsultations,
  getPrescriptions,
} = require("../controllers/patientController");
const { protect } = require("../middleware");
const router = express.Router();

router.post("/select-physician", protect, selectPhysician);
router.post("/select-pharmacist", protect, selectPharmacy);
router.get("/consultation", protect, getConsultations);
router.get("/prescription", protect, getPrescriptions);
router.get("/", getAllPatients);

module.exports = router;
