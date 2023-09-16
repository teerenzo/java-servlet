import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";
const PharmacistDash = () => {
  const User = localStorage.getItem("role");
  const [mediclist, setMediclist] = useState([]);
  const [patientlist, setPatientlist] = useState([]);
  useEffect(() => {
    if (User !== "Pharmacist") {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/pharmacist/medicine",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setMediclist(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured");
      });
  });

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/pharmacist/patient",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPatientlist(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Fetching Patients");
      });
  }, []);

  return (
    <>
    <div className="App">
      <div className="form">
        <div class="flex gap-20 justify-center">
          <div class="card">
            <h2>All Medicine(s)</h2>
            <p>
              {mediclist.length}<small></small>
            </p>
          </div>

          <div class="card">
            <h2>Patients</h2>
            <p>
              {patientlist.length}
            </p>
          </div>

        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PharmacistDash;
