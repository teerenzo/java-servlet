import React from "react";
import { useState, useEffect } from "react";
import AddMedicModel from "./PrescribeModel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";
const PatientTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [patientlist, setPatientlist] = useState([]);
  const [mediclist, setMediclist] = useState([]);
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

  return (
    <>
    <div className="App">
      <ToastContainer />
      <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded"  >Available Patients</a>

        <AddMedicModel
          mediclist={mediclist}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          patientUsername={patientUsername}
        />
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        {localStorage.getItem(patient.username)&&localStorage.getItem(patient.username).split('"')[1]!=patient.username? (
                          <span>
                               {patient.consultation ? (
                         
                         <button
                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                           onClick={() => {
                             setPatientUsername(patient.username);
                             setIsOpen(true);
                           }}
                         >
                          prescribe
                         </button>
                       ) : null}
                          </span>
                        ) : <a>prescribed</a>}
                     
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
     <Footer />
     </>
  );
};

export default PatientTable;
