const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const tomcatUrl = process.env.TOMCAT_SERVER_URL;


const getPharmacist = async (req, res) => {
  try {
    const config = {
      method: "get",
      url: `${tomcatUrl}/pharmacist`,
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

const addMedicine = async (req, res) => {
  try {
    const { medName, medPrice, expiration } = req.body;
    if (!medName || medName == "")
      return res.status(400).json({ error: "medName is required" });
    if (!medPrice || medPrice == "")
      return res.status(400).json({ error: "medPrice is required" });
    if (!expiration || expiration == "")
      return res.status(400).json({ error: "expiration is required" });

    let data = JSON.stringify({
      medName: medName,
      medPrice: medPrice,
      expiration: expiration,
    });

    let config = {
      method: "post",
      url: `${tomcatUrl}/pharmacist/medicine`,
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
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getMedicine = async (req, res) => {
  try {
    const config = {
      method: "get",
      url: `${tomcatUrl}/pharmacist/get-medicine`,
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

const giveMedicine = async (req, res) => {
  try {
    const { medName, patientUsername } = req.body;
    if (!medName || medName == "")
      return res.status(400).json({ error: "medName is required" });
    if (!patientUsername || patientUsername == "")
      return res.status(400).json({ error: "patientUsername is required" });

    let data = JSON.stringify({
      medicineName: medName,
      patientUsername: patientUsername,
    });

    let config = {
      method: "post",
      url: `${tomcatUrl}/pharmacist/provide-medicine`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.token}`,
      },
      data: data,
    };
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    return res
      .status(error.response.status)
      .json({ error: error.response.data.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const config = {
      method: "get",
      url: `${tomcatUrl}/pharmacist/patient`,
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

module.exports = {
  getPharmacist,
  addMedicine,
  getMedicine,
  giveMedicine,
  getPatients,
};
