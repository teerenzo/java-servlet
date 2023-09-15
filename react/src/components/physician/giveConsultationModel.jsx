import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function GiveConsultationModal({ isOpen, setIsOpen, patientUsername }) {
  const [consultation, setConsultation] = useState({
    diseaseName: "",
    description: "",
  });
  const { diseaseName, description } = consultation;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setConsultation({ ...consultation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      patientUsername,
      diseaseName,
      description,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/physician/consultation",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success(response.data.message);
        setConsultation({
          diseaseName: "",
          description: "",
        });
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
          <h2>Provide Consultation</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Patient">Patient Name</label>
            <input
              type="text"
              id="PatientName"
              value={patientUsername}
              disabled
            />
            <label htmlFor="diseaseName">Disease Name</label>
            <input
              type="text"
              id="diseaseName"
              name="diseaseName"
              value={diseaseName}
              onChange={onInputChange}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              rows={3}
              onChange={onInputChange}
              required
            >
              {description}
            </textarea>
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

export default GiveConsultationModal;
