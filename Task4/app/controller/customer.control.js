const deal= require("../helper/dealwithjson")
const showAllcustomer = (req, res) => {
   let customers=deal.readData()
    res.render("showAll", {
        pagetitle: "show All",
        customers,
        isEmpty: customers.length==0? true:false

    })
}
const addcustomer = (req, res) => {
    let customer = {
        id:Date.now(),
        accNum: Date.now(),
        name: req.query.name,
        intialBalance:req.query.intialBalance,
        remainBalance: req.query.remainBalance,
        operations:[]
        
    }
    console.log(req.query)
    if (req.query.name && req.query.intialBalance && req.query.remainBalance) {
        let customers = deal.readData()
        customers.push(customer)
        deal.writeData(customers)
        console.log('test')
        res.redirect("/")

    }
    res.render("addcustomer", {
      pagetitle:"add customer"
    })
}

const addoperation = (req, res) => {
    const accNum = req.params.accNum //1
    let allCustomers = deal.readData() //[1,2,3]
    var message = ""
    // var message=""//""

    if (req.query.addop) {
        let index = allCustomers.findIndex(u => u.accNum == accNum)        
         if (req.query.optype == "withdraw") {
             if (Number(allCustomers[index].remainBalance) < req.query.opvalue) {
                 message = "balance is not enough"
                 res.render("addoperation",{pagetitle:"add operation",message})
             }
             
        else allCustomers[index].remainBalance = Number(allCustomers[index].remainBalance) -Number(req.query.opvalue)
        
    }
    else if (req.query.optype == "add") {
             if (Number(req.query.opvalue > 6000)) {
                  message = "value must be less than 6000" 
                 res.render("addoperation", { pagetitle: "add operation", message })
             }
        else allCustomers[index].remainBalance = Number(allCustomers[index].remainBalance) +Number(req.query.opvalue)
       
        
        }
    let operation={ type: req.query.optype,
            value: req.query.opvalue,
            at: new Date()
        }
    allCustomers[index].operations.push(operation)
    deal.writeData(allCustomers)
    res.redirect("/")
    }
     res.render("addoperation",{pagetitle:"add operation"})
}

  

const showCustomer = (req, res) => {
    const accNum = req.params.accNum
    let allCustomers = deal.readData()
    let customer = allCustomers.find(u => u.accNum == accNum)
    console.log(...customer.operations)
    res.render("showcustomer", {
        pagetitle: "show customer",
        customer,
        isEmpty: customer? false:true

    })
 }
module.exports={addcustomer,addoperation,showAllcustomer,showCustomer}