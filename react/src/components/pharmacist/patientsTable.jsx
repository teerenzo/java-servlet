import React from "react";
import { useState, useEffect } from "react";
import AddMedicModel from "./giveMedicModel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PatientTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [patientlist, setPatientlist] = useState([]);
  const [patientUsername, setPatientUsername] = useState("");

  const User = localStorage.getItem("role");
  useEffect(() => {
    if (User !== "Pharmacist") {
      window.location.replace("/login");
    }
  }, []);

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
    <div className="App">
      <ToastContainer />
      <div className="form">
        <AddMedicModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          patientUsername={patientUsername}
        />
        <table>
          <thead className="heading">
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Physician</th>
              <th>Disease</th>
              <th>Descrption</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientlist.length > 0
              ? patientlist.map((patient) => {
                  return (
                    <tr>
                      <td>{patient.username}</td>
                      <td>{patient.name}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.age}</td>
                      <td>
                        {patient.selectedPhysician
                          ? patient.selectedPhysician.name
                          : null}
                      </td>
                      <td>
                        {patient?.consultation
                          ? patient?.consultation?.diseaseName
                          : null}
                      </td>
                      <td>
                        {patient?.consultation
                          ? patient?.consultation?.description
                          : null}
                      </td>
                      <td>
                        {patient.consultation ? (
                          <button
                            onClick={() => {
                              setPatientUsername(patient.username);
                              setIsOpen(true);
                            }}
                          >
                            Give Medic
                          </button>
                        ) : null}
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
