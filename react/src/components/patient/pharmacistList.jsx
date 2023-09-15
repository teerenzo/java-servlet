import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PharmacistTable = () => {
  const [pharmacistlist, setPharmacistlist] = useState([]);

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
      url: "http://localhost:4000/api/pharmacist",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPharmacistlist(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Fetching Pharmacists");
      });
  }, []);

  const selectPharmacist = (pharmacist) => {
    let config = {
      method: "post",
      url: "http://localhost:4000/api/patient/select-pharmacist",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        pharmacistPhone: pharmacist.phoneNumber,
      },
    };

    axios
      .request(config)
      .then((response) => {
       toast.success("Pharmacist Selected");
        window.location.replace("/patient/consultation");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Selecting Pharmacist");
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
              <th>Phone</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pharmacistlist.length > 0
              ? pharmacistlist.map((pharmacist) => {
                  return (
                    <tr>
                      <td>{pharmacist.name}</td>
                      <td>{pharmacist.phoneNumber}</td>
                      <td>{pharmacist.gender}</td>
                      <td>{pharmacist.age}</td>
                      <td>
                        <button onClick={() => selectPharmacist(pharmacist)}>
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

export default PharmacistTable;
