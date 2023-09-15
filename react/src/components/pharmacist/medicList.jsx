import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const MedicList = () => {
  const [mediclist, setMediclist] = useState([]);
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
    <div className="App">
      <ToastContainer />
      <div className="form">
        <div className="download">
          <Link to="/pharmacist/addMedic">
            {" "}
            <button>Add</button>
          </Link>
        </div>
        <table>
          <thead className="heading">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {mediclist.length > 0
              ? mediclist.map((medic) => {
                  return (
                    <tr>
                      <td>{medic.medName}</td>
                      <td>{medic.medPrice} RWF</td>
                      <td>{medic.expiration}</td>
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

export default MedicList;
