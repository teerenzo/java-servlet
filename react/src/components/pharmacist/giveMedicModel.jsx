import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function GiveMedicineModal({ isOpen, setIsOpen, patientUsername }) {
  const [medicineName, setMedicineName] = useState("");

  const handleMedicineNameChange = (e) => {
    setMedicineName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    let data = JSON.stringify({
      medName: medicineName,
      patientUsername,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/pharmacist/provide-medicine",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success(response.data.message);
        setMedicineName("");
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  return (
    isOpen && (
      <div className="popup">
        <div className="popup-inner">
          <h2>Provide Medicine</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="medicineName">Medicine Name</label>
            <input
              type="text"
              id="medicineName"
              value={medicineName}
              onChange={handleMedicineNameChange}
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default GiveMedicineModal;
