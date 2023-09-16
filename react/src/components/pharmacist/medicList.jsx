import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";
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
    <>
    <div className="App">
      <ToastContainer />
      <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded"  > <Link to="/pharmacist/addMedic">
            {" "}
            <button>Add Medecine</button>
          </Link></a>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
       <Footer />
       </>
  );
};

export default MedicList;
