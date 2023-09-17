import React from "react";
import Footer from "../includes/footer";
import { useState, useEffect } from "react";
import axios from "axios";

const PatientDash = () => {
  const User = localStorage.getItem("role");
  const [consultation, setConsultion] = useState([]);
  const [pharmacistlist, setPharmacistlist] = useState([]);
  const [prescriptionlist, setPrescriptionlist] = useState([]);
  useEffect(() => {
    if (User !== "Patient") {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/api/patient/consultation",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
        setConsultion(response.data.payload);
    })
    .catch((error) => {
      console.log(error);
    });
    
  },[]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/patient/prescription",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPrescriptionlist(response.data.payload);
      })
      .catch((error) => {
        console.log(error);

      });
  }, []);


  return (
    <>
    <div className="App">
      <div className="form">
        <div class="flex gap-20 justify-center">
          <div class="card">
            <h2>Consultation</h2>
            <p>
              {consultation&&consultation.length}
            </p>
          </div>

          <div class="card">
            <h2>Prescription(s)</h2>
            <p>
              {pharmacistlist.length}
            </p>
          </div>

        </div>
      </div>

    </div>
    <Footer/>
    </>
  );
};

export default PatientDash;
