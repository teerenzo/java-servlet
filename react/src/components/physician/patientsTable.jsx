import React from "react";
import { useState, useEffect } from "react";
// import AddMedicModel from "./giveMedicModel";
import axios from "axios";
import GiveConsultationModal from "./giveConsultationModel";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";

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
    <>
    <div className="App">
      <ToastContainer />
      <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded"  >Available</a>

        <GiveConsultationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          patientUsername={patientUsername}
        />
           <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setPatientUsername(patient.username);
                            setIsOpen(true);
                          }}
                        >
                          Consultation
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
    <Footer/>
    </>
  );
};

export default PatientTable;
