import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  useEffect(() => {
    isPublic();
  }, []);
  const [user, setuser] = useState({
    indetifier: "",
    password: "",
    role: "Patient",
  });
  const { indetifier, password, role } = user;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };
  const handlelogin = async (e) => {
    e.preventDefault();

    const data = {
      password: password,
      role: role,
    };

    if (role === "Patient") {
      data.username = indetifier;
    } else if (role === "Pharmacist") {
      data.phone = indetifier;
    } else if (role === "Physician") {
      data.email = indetifier;
    }

    let config = {
      method: "post",
      url: "http://localhost:4000/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        toast.success(res.data.message);
        console.log(JSON.stringify(res.data));
        localStorage.setItem("token", res.data.payload);
        localStorage.setItem("role", role);
        if (role == "Pharmacist") {
          window.location.replace("/pharmacist");
        } else if (role == "Physician") {
          window.location.replace("/physician");
        } else {
          window.location.replace("/patient");
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      });
    setuser({
      indetifier: "",
      password: "",
    });
  };
  return (
    <div className="App">
      <ToastContainer />
      <div className="form">
        <div className="login">
          <input
            type="text"
            placeholder="Email, Username or Phone number"
            name="indetifier"
            value={indetifier}
            onChange={(e) => onInputChange(e)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
          ></input>
          <select
            name="role"
            id="role"
            onChange={(e) => onInputChange(e)}
            title="login as"
          >
            <option value="Patient">Patient</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Physician">Physician</option>
          </select>
          <button onClick={handlelogin}>login</button>
          <p className="undermessage">
            {" "}
            <Link to="/signup">sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
