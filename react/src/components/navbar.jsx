import { Outlet, Link } from "react-router-dom";

function navbar() {
  const Role = localStorage.getItem("role");
  const handlelogout = () => {
    localStorage.removeItem("role");
    window.location.replace("/login");
  };
  return (
    <>
      <nav>
        <div className="logo">E-Hospital</div>
        <input type="checkbox" id="checkbox"></input>
        <label for="checkbox" id="icon">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul>
          {Role == "Physician" && (
            <>
              <li>
                <a href="#">
                  <Link to="/physician">Dashboard</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/physician/patients">Patients</Link>
                </a>
              </li>
            </>
          )}
          {Role == "Pharmacist" && (
            <>
              <li>
                <a href="#">
                  <Link to="/pharmacist">Dashboard</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/pharmacist/medic">Medicine</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/pharmacist/patients">Patients</Link>
                </a>
              </li>
            </>
          )}
          {Role == "Patient" && (
            <>
              <li>
                <a href="#">
                  <Link to="/patient">Dashboard</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/patient/prescription">Prescription</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/patient/consultation">Consultation</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/patient/physician">Physician</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/patient/pharmacist">Pharmacist</Link>
                </a>
              </li>
            </>
          )}
          {Role ? (
            <li>
              <a href="#" class="active" onClick={handlelogout}>
                logout
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default navbar;
