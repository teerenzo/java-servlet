import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";

const PhysicianTable = () => {
  const [physicianlist, setPhysicianlist] = useState([]);

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
      url: "http://localhost:4000/api/physician",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPhysicianlist(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Fetching Physicians");
      });
  });

  const selectPhysician = (physician) => {
    let config = {
      method: "post",
      url: "http://localhost:4000/api/patient/select-physician",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        physicianEmail: physician.email,
      },
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Physician Selected");
        window.location.replace("/patient/consultation");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Selecting Physician");
      });
  };

  return (<>
    <div className="App">
      <ToastContainer />
    
      <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded"  >Available</a>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {physicianlist.length > 0
              ? physicianlist.map((physician) => {
                  return (
                    <tr>
                      <td>{physician.name}</td>
                      <td>{physician.email}</td>
                      <td>{physician.gender}</td>
                      <td>{physician.age}</td>
                      <td>
                        <button  class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => selectPhysician(physician)}>
                          Allow
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

export default PhysicianTable;
