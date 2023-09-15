import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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

  return (
    <div className="App">
      <ToastContainer />
      <div className="form">
        <table>
          <thead className="heading">
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
                        <button onClick={() => selectPhysician(physician)}>
                          Select
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

export default PhysicianTable;
