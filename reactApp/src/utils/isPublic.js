const isPublic = () => {
  if (localStorage.getItem("token")) {
    const role = localStorage.getItem("role");
    if (role === "Pharmacist") {
      window.location.replace("/pharmacist");
    }
    if (role === "Physician") {
      window.location.replace("/physician");
    }
    if (role === "Patient") {
      window.location.replace("/patient");
    }
  }
};
export default isPublic;
