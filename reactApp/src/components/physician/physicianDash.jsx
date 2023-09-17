import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const PhysicianDash = () => {
  const User = localStorage.getItem("role");
  const [patientlist, setPatientlist] = useState([]);
  useEffect(() => {
    if (User !== "Physician") {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/physician/patient",
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
    
      });
  }, []);

  return (
    <div className="App">
      <div className="form">
        <div class="cards-container">
          <div class="card">
            <h2>Assigned Patient(s)</h2>
            <p>
              {patientlist&&patientlist.length}<small> </small>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PhysicianDash;
