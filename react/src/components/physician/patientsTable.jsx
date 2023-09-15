import React from "react";
import { useState, useEffect } from "react";
// import AddMedicModel from "./giveMedicModel";
import axios from "axios";
import GiveConsultationModal from "./giveConsultationModel";
import { ToastContainer, toast } from "react-toastify";

const PatientTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [patientlist, setPatientlist] = useState([]);
  const [patientUsername, setPatientUsername] = useState("");

  const User = localStorage.getItem("role");
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
        toast.error("Error Fetching Patients");
      });
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <div className="form">
        <GiveConsultationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          patientUsername={patientUsername}
        />
        <table>
          <thead className="heading">
            <tr>
              <th>Username</th>
              <th colSpan={2}>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientlist.length > 0
              ? patientlist.map((patient) => {
                  return (
                    <tr>
                      <td>{patient.username}</td>
                      <td colSpan={2}>{patient.name}</td>
                      <td>{patient.gender}</td>

                      <td>{patient.age}</td>
                      <td>
                        <button
                          onClick={() => {
                            setPatientUsername(patient.username);
                            setIsOpen(true);
                          }}
                        >
                          Give Consultation
                        </button>
                      </td>
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

export default PatientTable;
