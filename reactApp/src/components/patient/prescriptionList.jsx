import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";
const PrescriptionTable = () => {
  const [prescriptionlist, setPrescriptionlist] = useState([]);

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
        toast.error("Error Occured");
      });
  }, []);

  return (
    <>
    <div className="App">
      <ToastContainer />
      <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      
        {prescriptionlist && prescriptionlist.length > 0 ? (
          <div  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded w-40">
            <button >
              <CSVLink
                data={prescriptionlist}
                filename={"prescription.csv"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Export CSV
              </CSVLink>
            </button>
          </div>
        ) : (<a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded w-40"  >Available Prescription</a>
        )}
   
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionlist && prescriptionlist.length > 0
              ? prescriptionlist.map((prescription) => {
                  return (
                    <tr>
                      <td>{prescription.medName}</td>
                      <td>{prescription.medPrice} RWF</td>
                      <td>{prescription.expiration}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrescriptionTable;
