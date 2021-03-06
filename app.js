const express = require("express");
require("./app/adapters/databases/postgresql");
const app = express();
const vehicleRoute = require("./app/routes/vehicleRoute");
const deviceTypeRoute = require("./app/routes/deviceTypeRoute");
const deviceRoute = require("./app/routes/deviceRoute");
const logTemperatureRoute = require("./app/routes/logTemperatureRoute");
const logLocationRoute = require("./app/routes/logLocationRoute");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// catch 404 and forward to error handler

app.use("/vehicles", vehicleRoute);
app.use("/device", deviceRoute);
app.use("/device_type", deviceTypeRoute);
app.use("/log_temperature", logTemperatureRoute);
app.use("/log_location", logLocationRoute);
app.get('*', function(req, res){
  res.send('this routes not avaliable', 404);
});
app.listen("3000", function (req, res) {
  console.log(`server starterd on ${PORT}`);
});
