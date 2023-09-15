import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddMedic = () => {
  const User = localStorage.getItem("role");
  useEffect(() => {
    if (User !== "Pharmacist") {
      window.location.replace("/login");
    }
  }, []);
  const [medic, setMedic] = useState({
    medicName: "",
    price: "",
    expiration: "",
  });

  const { medicName, price, expiration } = medic;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setMedic({ ...medic, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      medName: medicName,
      medPrice: price,
      expiration,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/pharmacist/medicine",
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
        window.location.replace("/pharmacist/medic");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="form">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Medicine Name"
              name="medicName"
              value={medicName}
              required
              onChange={(e) => onInputChange(e)}
            />
            <input
              type="text"
              placeholder="Medicine Price"
              name="price"
              required
              value={price}
              onChange={(e) => onInputChange(e)}
            />
            <input
              type="date"
              name="expiration"
              title="Medicine Expiry Date"
              required
              value={expiration}
              onChange={(e) => onInputChange(e)}
            />
            <button>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedic;
