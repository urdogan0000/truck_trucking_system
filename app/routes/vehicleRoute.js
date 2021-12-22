const express=require('express')
const vehicleController=require("../controllers/vehicleController")

const router =express.Router()


router.route("/vehicle_list").get(vehicleController.getVehicles)
router.route("/vehicle_add").post(vehicleController.createVehicle)
router.route("/vehicle_update").patch(vehicleController.updateVehicle)
router.route("/vehicle_delete").delete(vehicleController.deleteVehicle)


module.exports=router