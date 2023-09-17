import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";
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

  const storeSelectedInLocalStorage = (pharmacist) => {

    localStorage.setItem(pharmacist.phoneNumber, JSON.stringify(pharmacist));
  };

  const getSelectedFromLocalStorage = (pharmacist1) => {
    const pharmacist = localStorage.getItem(pharmacist1);

    return JSON.parse(pharmacist);
  };


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
        storeSelectedInLocalStorage(pharmacist);
       toast.success("Pharmacist Selected");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Selecting Pharmacist");
      });
  };

  return (
    <>
    <div className="App">
      <ToastContainer />
      <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <a  class=" px-10 py-2 mb-4 text-white  bg-blue-400 rounded"  >Available Pharmacist</a>

        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Gender</th>
            <th scope="col" class="px-6 py-3">Age</th>
            <th scope="col" class="px-6 py-3">Status</th>

            <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {pharmacistlist.length > 0
              ? pharmacistlist.map((pharmacist) => {
                  return (
                    <tr>
                      <td class="px-6 py-4">{pharmacist.name}</td>
                      <td class="px-6 py-4">{pharmacist.phoneNumber}</td>
                      <td class="px-6 py-4">{pharmacist.gender}</td>
                      <td class="px-6 py-4">{pharmacist.age}</td>
                      <td>
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                        {getSelectedFromLocalStorage(pharmacist.phoneNumber)&&getSelectedFromLocalStorage(pharmacist.phoneNumber).phoneNumber==pharmacist.phoneNumber?"allowed":"not yet"}  
                        </button>
                      </td>
                      <td>
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => selectPharmacist(pharmacist)}>
                    allow
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

export default PharmacistTable;
