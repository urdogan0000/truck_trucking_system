const express=require('express')
const deviceTypeController=require("../controllers/deviceTypeController")

const router =express.Router()


router.route("/type_list").get(deviceTypeController.getTypes)
router.route("/type_add").post(deviceTypeController.createType)
router.route("/type_delete").delete(deviceTypeController.deleteType)


module.exports=router