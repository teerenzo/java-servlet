import React from "react";
import { useEffect } from "react";
import Footer from "../includes/footer";

const PatientDash = () => {
  const User = localStorage.getItem("role");
  useEffect(() => {
    if (User !== "Patient") {
      window.location.replace("/login");
    }
  }, []);

  return (
    <>
    <div className="App">
      <div className="form">
        <div class="cards-container">
          <div class="card">
            <h2>Prescriptions Filled Today</h2>
            <p>
              50<small> prescriptions</small>
            </p>
          </div>

          <div class="card">
            <h2>Revenue Today</h2>
            <p>
              $5000<small> CAD</small>
            </p>
          </div>

          <div class="card">
            <h2>Average Turnaround Time</h2>
            <p>
              30<small> minutes</small>
            </p>
          </div>
        </div>
      </div>

    </div>
    <Footer/>
    </>
  );
};

export default PatientDash;
