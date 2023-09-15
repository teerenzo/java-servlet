import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";

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
    <div className="App">
      <ToastContainer />
      <div className="form">
        {prescriptionlist && prescriptionlist.length > 0 ? (
          <div className="download">
            <button>
              <CSVLink
                data={prescriptionlist}
                filename={"my-prescription.csv"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Download
              </CSVLink>
            </button>
          </div>
        ) : null}
        <table>
          <thead className="heading">
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
  );
};

export default PrescriptionTable;
