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
        <div className="logo text-[#015AAB]">(250) 786373726</div>
      
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
          ) :  (<a className="text-[#015AAB]" href="/login">Login</a>)}
        </ul>
       
      </nav>
      <Outlet />
    </>
  );
}

export default navbar;
