const express=require('express')
const logTemperatureController=require("../controllers/logTemperatureController")

const router =express.Router()


router.route("/temp_list").get(logTemperatureController.getTemp)
router.route("/temp_add").post(logTemperatureController.createTemp)


module.exports=router