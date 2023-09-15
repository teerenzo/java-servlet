const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const tomcatUrl = process.env.TOMCAT_SERVER_URL;


const getAllPatients = async (req, res) => {
  try {
    let config = {
      method: "get",
      url: `${tomcatUrl}/patient`,
      headers: {
        "Content-Type": "application/json",
      },
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

const selectPhysician = async (req, res) => {
  try {
    const { token } = req;
    const { physicianEmail } = req.body;
    if (!physicianEmail || physicianEmail == "")
      return res.status(400).json({ error: "physicianEmail is required" });

    let data = JSON.stringify({
      physicianEmail: physicianEmail,
    });

    let config = {
      method: "post",
      url: `${tomcatUrl}/patient/select-physician`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const selectPharmacy = async (req, res) => {
  try {
    const { pharmacistPhone } = req.body;
    if (!pharmacistPhone || pharmacistPhone == "")
      return res.status(400).json({ error: "pharmacistPhone is required" });

    let data = JSON.stringify({
      pharmacistPhone: pharmacistPhone,
    });

    let config = {
      method: "post",
      url: `${tomcatUrl}/patient/select-pharmacist`,
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

const getConsultations = async (req, res) => {
  try {
    let config = {
      method: "get",
      url: `${tomcatUrl}/patient/consultation`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.token}`,
      },
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

const getPrescriptions = async (req, res) => {
  try {
    let config = {
      method: "get",
      url: `${tomcatUrl}/patient/prescription`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.token}`,
      },
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


module.exports = {
  getAllPatients,
  selectPhysician,
  selectPharmacy,
  getConsultations,
  getPrescriptions,
};
