const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const tomcatUrl = process.env.TOMCAT_SERVER_URL;



const signup = async (req, res) => {
  try {
    const { name, age, gender, username, password, role, phone, email } =
      req.body;
      console.log("url ",tomcatUrl);
    console.log(role);
    if (!role || role == "")
      return res.status(400).json({ error: "role is required" });
    if (role != "Patient" && role != "Pharmacist" && role != "Physician")
      return res.status(400).json({ error: "role is not valid" });
    if (!name || name == "")
      return res.status(400).json({ error: "Name is required" });
    if (!age || age == "")
      return res.status(400).json({ error: "Age is required" });
    if (!gender || gender == "")
      return res.status(400).json({ error: "gender is required" });
    if ((role == "Patient" && !username) || username == "")
      return res.status(400).json({ error: "username is required" });
    if ((role == "Pharmacist" && !phone) || phone == "")
      return res.status(400).json({ error: "phone is required" });
    if ((role == "Physician" && !email) || email == "")
      return res.status(400).json({ error: "email is required" });
    if (!password || password == "")
      return res.status(400).json({ error: "password is required" });

    let data = {
      name: name,
      age: age,
      gender: gender,
      role: role,
      password: password,
    };

    if (data.role === "Patient") {
      data.username = username;
    } else if (data.role === "Pharmacist") {
      data.phoneNumber = phone;
    } else if (data.role === "Physician") {
      data.email = email;
    }
    // Convert data to JSON string
    data = JSON.stringify(data);

    let config = {
      method: "post",
      url: `${tomcatUrl}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const api = await axios.request(config);
      return res.status(api.status).json(api.data);
    } catch (error) {
      console.log(error);
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    if (!role || role == "")
      return res.status(400).json({ error: "role is required" });
    if (role != "Patient" && role != "Pharmacist" && role != "Physician")
      return res.status(400).json({ error: "role is not valid" });
    if ((role == "Patient" && !username) || username == "")
      return res.status(400).json({ error: "username is required" });
    if ((role == "Pharmacist" && !phone) || phone == "")
      return res.status(400).json({ error: "phone is required" });
    if ((role == "Physician" && !email) || email == "")
      return res.status(400).json({ error: "email is required" });
    if (!password || password == "")
      return res.status(400).json({ error: "password is required" });

    let data = {
      password: password,
    };

    if (role === "Patient") {
      data.username = username;
    } else if (role === "Pharmacist") {
      data.phone = phone;
    } else if (role === "Physician") {
      data.email = email;
    }

    // Convert data to JSON string
    data = JSON.stringify(data);

    let config = {
      method: "post",
      url: `${tomcatUrl}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server Error"});
  }
};

module.exports = { signup, login };
