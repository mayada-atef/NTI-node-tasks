
const router = require("express").Router()
const customercontrol = require("../app/controller/customer.control.js")
router.get("/", customercontrol.showAllcustomer)
router.get("/addcustomer", customercontrol.addcustomer)
router.get("/addop/:accNum", customercontrol.addoperation)
router.get("/showcustomer/:accNum", customercontrol.showCustomer)
module.exports=router