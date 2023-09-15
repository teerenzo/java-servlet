import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import PatientsTable from "./components/pharmacist/patientsTable";
import AddMedic from "./components/pharmacist/addMedic";
import MedicList from "./components/pharmacist/medicList";
import PharmacistDash from "./components/pharmacist/pharmacistDash";
import PatientDash from "./components/patient/patientDash";
import PhysicianTable from "./components/patient/physicianList";
import PharmacistTable from "./components/patient/pharmacistList";
import ConsultationTable from "./components/patient/consultationList";
import PrescriptionTable from "./components/patient/prescriptionList";
import NotFound from "./components/notFound";
import PhysicianDash from "./components/physician/physicianDash";
import PatientTable from "./components/physician/patientsTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* pharmacist */}
          <Route path="/pharmacist" element={<PharmacistDash />} />
          <Route path="/pharmacist/addMedic" element={<AddMedic />} />
          <Route path="/pharmacist/medic" element={<MedicList />} />
          <Route path="/pharmacist/patients" element={<PatientsTable />} />
          {/* Patient */}
          <Route path="/patient" element={<PatientDash />} />
          <Route path="patient/prescription" element={<PrescriptionTable />} />
          <Route path="/patient/physician" element={<PhysicianTable />} />
          <Route path="/patient/consultation" element={<ConsultationTable />} />
          <Route path="/patient/pharmacist" element={<PharmacistTable />} />

          {/* physician */}
          <Route path="/physician" element={<PhysicianDash />} />
          <Route path="/physician/patients" element={<PatientTable />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
