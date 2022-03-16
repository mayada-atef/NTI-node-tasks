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
        remainBalance:req.query.remainBalance   
       }
    if (req.query.name && req.query.intialBalance&&req.query.remainBalance) {
        let customers = deal.readData()
        customers.push(customer)
        deal.writeData(customers)
        res.redirect("/")

    }
    res.render("/addcustomer", {
      pagetitle:"add customer",message
    })
}

const addoperation = (req, res) => {
    const accNum = req.params.accNum
    let allCustomers = deal.readData()
    let message=""
    // let customer = allCustomers.find(u => u.accNum == accNum)
    if (req.query.addop) {
        let index = allUsers.findIndex(u => u.accNum == accNum)
        
         if (req.query.optype == "withdraw") {
             if (allCustomers[index].remainBalance < req.query.opvalue) { message = "balance is not enough" }
        else allCustomers[index].remainBalance = allCustomers[index].remainBalance - req.query.opvalue
        
    }
    else if (req.query.optype == "add") {
        if (req.query.opvalue> 6000){message="value must be less than 6000"} 
        else allCustomers[index].remainBalance = allCustomers[index].remainBalance +req.query.opvalue
       
        
    }
        let newcustomer = {
        id:allCustomers[index].id,
        accNum: accNum,
        name: allCustomers[index].name,              //customer.name,
        intialBalance:allCustomers[index].intialBalance,
        remainBalance:allCustomers[index].remainBalance,
        operations:[{
           type: req.query.optype,
            value: req.query.opvalue,
            at: new Date()  }]
            
        }
        allCustomers[index]= newcustomer
        deal.writeData(allCustomers)
        res.redirect("/")
    }
     res.render("/addoperation",{pagetitle:"add operation",message})
}

  

const showCustomer = (req, res) => { }
module.exports={addcustomer,addoperation,showAllcustomer,showCustomer}