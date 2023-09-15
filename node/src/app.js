const express = require("express")
const cors=require('cors')
const { json } = require('express')
const dotenv = require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 5000;

const app = express()


//cors
app.use(cors());
app.use(json())

//routes
app.use('/api',require('./routes'))

app.listen(PORT, () => {
  console.log(`Server has started! on PORT ${PORT}`)
})

module.exports = app;