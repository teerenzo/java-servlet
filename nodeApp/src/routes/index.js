const express = require("express");
const router = express.Router();

const pharmacistRoutes = require("./pharmacistRoutes");
const physicianRoutes = require("./physicianRoutes");
const patientRoutes = require("./patientRoutes");
const authRoutes = require("./authRoutes");

router.use("/physician", physicianRoutes);
router.use("/pharmacist", pharmacistRoutes);
router.use("/patient", patientRoutes);
router.use("/auth", authRoutes);

module.exports = router;
