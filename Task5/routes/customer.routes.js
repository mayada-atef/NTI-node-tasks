
const router = require("express").Router()
const customercontrol = require("../app/controller/customer.control.js")
router.get("/", customercontrol.showAllcustomer)
router.get("/addcustomer", customercontrol.addcustomer)
router.post("/addcustomer", customercontrol.addLogic)
router.get("/addop/:accNum", customercontrol.addoperation)
// router.post("/addop/:accNum", customercontrol.addopLogioc)
router.get("/showcustomer/:accNum", customercontrol.showCustomer)
module.exports=router