import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";
import LoginImage from '../assets/images/loginImage.png';
import Footer from './includes/footer';

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
      <section class="h-screen bg-[#E4E4E4] flex items-center justify-center">
  <div class="container h-[80vh] px-6 py-24 bg-white my-10">
      <div
      class="g-6 flex h-auto flex-wrap items-center justify-center">
  <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 ">
        <img
          src={LoginImage}
          class="w-full"
          alt="Phone image" />
      </div>
      <div className="form">
        <div className="login">
        <select
            name="role"
            id="role"
            onChange={(e) => onInputChange(e)}
            title="login as"
          >
            <option selected disabled value="">Select Role</option>  
                      <option value="Patient">Patient</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Physician">Physician</option>
          </select>
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
        
          <button className="bg-[#015AAB]" onClick={handlelogin}>login</button>
         
      
          <div
            class="my-4 flex items-center before:mt-0.5 ">
            <p
              class="mx-4 mb-0 text-center font-semibold ">
              New to site?
            </p>
        
            <a class="text-[#015AAB]" >
            <Link to="/signup">sign up</Link>
            </a>
         

          </div>
        </div>
      </div>
      </div>
    </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Login;
