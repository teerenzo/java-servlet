import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PrescriptionMedicineModal({mediclist, isOpen, setIsOpen, patientUsername }) {
  const [medicineName, setMedicineName] = useState("");

  const handleMedicineNameChange = (e) => {
    setMedicineName(e.target.value);
  };

  const storeSelectedInLocalStorage = () => {
    localStorage.setItem(patientUsername, JSON.stringify(patientUsername));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicineName.trim()) {
      toast.error("Please Select Medicine");
      return;
    };

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
        storeSelectedInLocalStorage();
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
          <h2>Select Medecine From Available Medicine(s)</h2>
          <form onSubmit={handleSubmit}>
           
             <select
            name="role"
            id="role"
            onChange={handleMedicineNameChange}
            title="login as"
          >
            <option value="">Select Medicine</option>
            {mediclist.length > 0
              ? mediclist.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.medName}
                  </option>
                ))  
              : null}
       
          </select>
            <button type="submit">Save</button>
            <button className="bg-red" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default PrescriptionMedicineModal;
