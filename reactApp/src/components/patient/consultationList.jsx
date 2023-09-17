import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../includes/footer";
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
    <>
    <div className="App">
        <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded"  >Available Consultation</a>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
    <Footer/>
    </>
  );
};

export default ConsultationTable;
