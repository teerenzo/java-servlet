const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const tomcatUrl = process.env.TOMCAT_SERVER_URL;

const getPatients = async (req, res) => {
  try {
    const config = {
      method: "get",
      url: `${tomcatUrl}/physician/patient`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.token}`,
      },
    };

    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const giveConsultation = async (req, res) => {
  const { patientUsername, diseaseName, description } = req.body;
  if (!patientUsername || patientUsername == "")
    return res.status(400).json({ error: "patientUsername is required" });
  if (!diseaseName || diseaseName == "")
    return res.status(400).json({ error: "diseaseName is required" });
  if (!description || description == "")
    return res.status(400).json({ error: "description is required" });

  let data = JSON.stringify({
    patientUsername: patientUsername,
    diseaseName: diseaseName,
    description: description,
  });

  let config = {
    method: "post",
    url: `${tomcatUrl}/physician/consultation`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.token}`,
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getPhysicians = async (req, res) => {
  try {
    const config = {
      method: "get",
      url: `${tomcatUrl}/physician`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getPatients,
  giveConsultation,
  getPhysicians,
};
