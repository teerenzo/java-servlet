import React from "react";
import { useState, useEffect } from "react";
// import AddMedicModel from "./giveMedicModel";
import axios from "axios";

const ConsultationTable = () => {
  const [consultation, setConsultion] = useState([]);

  const User = localStorage.getItem("role");
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

  console.log("here",consultation);
  return (
    <div className="App">
      <div className="form">
        <table>
          <thead className="heading">
            <tr>
              <th>Physician</th>
              <th>Disease Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {consultation &&(
                    <tr>
                      <td>{consultation?.physician?.name}</td>
                      <td>{consultation.diseaseName}</td>
                      <td>{consultation.description}</td>
                    </tr>
                  )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationTable;
