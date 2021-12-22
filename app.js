const express = require("express");
require('./app/adapters/databases/postgresql')
const app = express();
const vehicleRoute =require("./app/routes/vehicleRoute")
const deviceTypeRoute =require("./app/routes/deviceTypeRoute")

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json());



app.use("/vehicles",vehicleRoute)
app.use("/device_type",deviceTypeRoute)

app.listen("3000", function (req, res) {
  console.log(`server starterd on ${PORT}`);
});
