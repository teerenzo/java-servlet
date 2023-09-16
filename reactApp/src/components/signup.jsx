import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";
import LoginImage from '../assets/images/loginImage.png';
import Footer from './includes/footer';

const Signup = () => {
  useEffect(() => {
    isPublic();
  }, []);
  const [userRegister, setuserRegister] = useState({
    indetifier: "",
    pass: "",
    FirstName: "",
    LastName: "",
    Age: "",
    Gender: "",
    Role: "Patient",
  });
  const { indetifier, password, confirmPassword, name, Age, Gender, Role } =
    userRegister;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setuserRegister({ ...userRegister, [name]: value });
  };
  const handlesignup = async () => {
    const data = {
      name: name,
      age: Age,
      gender: Gender,
      password: password,
      role: Role,
    };
    if (Role === "Patient") {
      data.username = indetifier;
    } else if (Role === "Pharmacist") {
      data.phone = indetifier;
    } else if (Role === "Physician") {
      data.email = indetifier;
    }
    let config = {
      method: "post",
      url: "http://localhost:4000/api/auth/signup",
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
        window.location.replace("/login");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      });

    setuserRegister({
      indetifier: "",
      password: "",
      confirmPassword: "",
      name: "",
      Age: "",
      Gender: "",
      Role: "",
    });
  };
  return (
    <div className="App">
      <ToastContainer/>   
      <section class="  flex  justify-center">
  <div class="container h-[80vh] px-6  bg-white mb-10">
      <div
      class="g-6 flex h-auto flex-wrap items-center justify-center">
  <div class="mb-8 md:mb-0 md:w-8/12 lg:w-6/12 ">
        <img
          src={LoginImage}
          class="w-full"
          alt="Phone image" />
      </div>
      <div className="form">
        <div className="register">
          <div className="oneinput">
            <select name="Role" value={Role} onChange={(e) => onInputChange(e)}>
              <option value="">Select Role</option>
              <option value="Patient">Patient</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Physician">Physician</option>
            </select>
          </div>
          <div className="rowInput">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            ></input>
            <div className="divider"></div>
            <select
              name="Gender"
              value={Gender}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Select Gender</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </select>
          </div>
          <div className="rowInput">
            <input
              type="number"
              placeholder="age"
              name="Age"
              value={Age}
              onChange={(e) => onInputChange(e)}
            ></input>
            <div className="divider"></div>
            {Role === "Patient" && (
              <input
                type="text"
                placeholder="Username"
                name="indetifier"
                value={indetifier}
                onChange={(e) => onInputChange(e)}
              ></input>
            )}{" "}
            {Role === "Pharmacist" && (
              <input
                type="text"
                placeholder="Phone"
                name="indetifier"
                value={indetifier}
                onChange={(e) => onInputChange(e)}
              ></input>
            )}
            {Role === "Physician" && (
              <input
                type="text"
                placeholder="email"
                name="indetifier"
                value={indetifier}
                onChange={(e) => onInputChange(e)}
              ></input>
            )}
          </div>
          <div className="rowInput">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            ></input>
            <div className="divider"></div>
            <input
              type="password"
              placeholder="Comfirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => onInputChange(e)}
            ></input>
          </div>

          <button onClick={handlesignup}>sign up</button>
        

          <div
            class="my-4 flex items-center before:mt-0.5 ">
            <p
              class="mx-4 mb-0 text-center font-semibold ">
              have an account?
            </p>
        
            <a class="text-[#015AAB]" href="/login">
            <Link to="/login">login</Link>
            </a>

            <a class="text-[#015AAB] mx-10" href="/">
            Back Home
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

export default Signup;
