const chalk = require("chalk")
const dealWithJSON = require("./dealWithJSON")

const addcustomer = (customerdata) => {
    try {
        if (customerdata.name.length < 3) throw new Error("invalid name")
        const data = dealWithJSON.readdata()
        // customerdata
        data.push(customerdata)
        console.log(data)
        dealWithJSON.writedata(data)
        console.log(chalk.green("new customer added"))
    }
    catch (error) {
        console.log(chalk.red(error.message))
    }
}
// const findindex = (customerdata, key, val) => {
//    const i = customerdata.findIndex(u => { u[key] == val })
//     return i
// }
// (id, type, value, date)
const addoperation = (obj) => { 
    const customerdata = dealWithJSON.readdata()
    console.log(customerdata)
     console.log("test1")
    console.log(obj.id)
    console.log("test2")
    const index = customerdata.findIndex(u => {
        console.log(chalk.red(u.id))
        console.log(typeof(u.id))
        console.log(chalk.green(obj.id))
         console.log(typeof(obj.id))

        u.id==obj.id
    })
   
    // let index = findindex(customerdata, "accNum", accNum)
    console.log(index)
    // let remain = customerdata[index]["remainigBalance"]
    
    // if (type == "withdraw") {
    //     if (remain < value) return console.log("balance is not enough")
    //     else remain=remain-value
        
    // }
    // else if (type == "add") {
    //     if (value > 6000) return console.log("value must be less than 6000")
    //     else remain=remain+value
        
    // }
    // customerdata[index]["remainigBalance"] = remain
    // operationobj = {
    //     opType: type,
    //     val: value,
    //     at: date
    // }
    // customerdata[index]["operations"].push(operationobj)
    // dealWithJSON.writedata(customerdata)
    // console.log(dealWithJSON.readdata()) 
}

const showcustomer = (accnum) => {
    const customerdata = dealWithJSON.readdata()
    let index = findindex(customerdata, "accNum", accnum)
    if (!index == -1) console.log(customerdata[index])
    else console.log("customer is not found ")
     
}
module.exports={addcustomer,addoperation,showcustomer}
