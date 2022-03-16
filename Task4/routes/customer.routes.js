
const router = require("express").Router()
const customercontrol = require("../app/controller/customer.control.js")
router.get("/", customercontrol.showAllcustomer)
router.get("/addcustomer", customercontrol.addcustomer)
router.get("/addop", customercontrol.addoperation)
router.get("/showcustomer", customercontrol.showCustomer)
module.exports=router