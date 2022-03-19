
const db=require("../../models/dbconnection")
const showAllcustomer = (req, res) => {
     db((err, connection) => {
        connection.collection("customers").find().toArray((e,customers) => {
            if (e) res.send(e)
            res.render("showAll", {
                pagetitle: "show All",
                customers,
                isEmpty: (customers.length == 0 ? true : false)
            })

        })
    })
}
const addcustomer = (req, res) => {
      res.render("addcustomer", {
      pagetitle:"add customer"
    })
}
const addLogic=(req, res) => {
   
     let customer = {
        accNum: Date.now(),
        name: req.body.name,
        intialBalance:req.body.intialBalance,
        remainBalance: req.body.remainBalance,
         operations: []
    }
      db((err, connection) => {
          connection.collection("customers").insertOne(customer,
              (e, result) => {
                  if (e) res.send(e)
                  res.redirect("/")

        })
    })
        
}
// const calremainbalance =(type,value,balance)=>{  
//     if (type=="withdraw") {
//         if (Number(balance)<Number(value)) throw new Error ("balance is not enough")
//         else balance = Number(balance)-Number(value)
//     }
//     else if (type == "add") {
//         if (Number(value) > 6000) throw new Error("value must be less than 6000") 
//         else balance = Number(balance)+Number(value)
//     }
//     return balance
// }
const addoperation=(req,res) => {
    res.render("addoperation", { pagetitle: "add operation" })
    const accNum = req.params.accNum 
    // console.log(accNum)
    var balance
    var customersdata
    // var index
  
    if (req.query.addop) {
        let type = req.query.optype
        // console.log("type", type)
        let value = req.query.opvalue
        // console.log(typeof(value))
        // console.log("value", value)
        let operation = { type: type, value: value, at: new Date() }
         db((err, connection) => {
                connection.collection("customers").find().toArray((e,customers) => {
                if (e) res.send(e)
                    let index = customers.findIndex(u => u.accNum == accNum)
                    balance = customers[index].remainBalance
                    customers[index].operations.push(operation)
                    // console.log(customers[index].operations)
                    console.log("id",customers[0]._id)
                    try { 
                        if (type == "withdraw") {
                            if (Number(balance)<Number(value)) throw new Error ("balance is not enough")
                            else balance = Number(balance)-Number(value)
                        }
                        else if (type == "add") {
                            if (Number(value) > 6000) throw new Error("value must be less than 6000") 
                            else balance = Number(balance)+Number(value)
                        }
                        // console.log("balance", balance, Date.now)
                        customers[index].remainBalance = balance 
                        customersdata = customers
                               
                        // console.log(customersdata)
                        // console.log(customers[index].remainBalance)
                        // connection.collection("customers").insertOne(customers,
                        //     (e, result) => {
                        //         if (e) res.send(e)
                        //         res.redirect("/")
                        //     })
                       
                    }
                    catch (e) {
                    message = e.message
                    console.log(message)
                    }
                   
                })
         })
         res.redirect("/")
    //     db((err, connection) => {
    //      console.log(customersdata[0]._id)             
    //     connection.collection("customers").insertOne(customersdata,
    //     (e, result) => {
    //         if (e) res.send(e)
    //         })
    // })
    }
    // console.log(customersdata[0]._id)
    // db((err, connection) => {
    //     connection.collection("customers").insertOne(customersdata,
    //     (e, result) => {
    //         if (e) res.send(e)
    //         res.redirect("/")})
    // })
    // res.redirect("/")
  
    
}

// const addopLogioc = (req, res) => {
//     const accNum = req.params.accNum 
//     console.log(accNum)
//     let type = req.body.optype
//     let value = req.body.opvalue
//     var customersdata
//     var index
  
//     if (req.req.addop){
//         try {
//             db((err, connection) => {
//                 connection.collection("customers").find().toArray((e,customers) => {
//                 if (e) res.send(e)
//                     index = customers.findIndex(u => u.accNum == accNum) 
//                     console.log(index)
//                     console.log(customers)
                    
//                     customersdata = customers
//                 })
//             })
//             let balance = calremainbalance(type, value, customersdata[index].remainBalance)
//             let operation = { type: type, value: value, at: new Date() }
//              customersdata[index].operations.push(operation)
//              customersdata[index].remainBalance=balance
//             db((err, connection) => {
//                 connection.collection("customers").insertOne(customer,
//                 (e, result) => {
//                 if (e) res.send(e)
//                 res.redirect("/")})
    
//             })  
            
//         }
//         catch (e) {
//             message = e
//             console.log(message)
//         }

//     }
  
// }

  

const showCustomer = (req, res) => {
    const accNum = req.params.accNum
     db((err, connection) => {
        connection.collection("customers").find().toArray((e,customers) => {
            if (e) res.send(e)
            let customer = customers.find(u => u.accNum == accNum)
            res.render("showcustomer", {
            pagetitle: "show customer",
            customer,
            isEmpty: customer? false:true
            })

        })
    })
 }
module.exports={addcustomer,addLogic,addoperation,showAllcustomer,showCustomer}