const chalk = require("chalk")
const dealWithJSON = require("./dealWithJSON")

const addcustomer = (customerdata) => {
    try {
        if (customerdata.name.length < 3) throw new Error("invalid name")
        const data = dealWithJSON.readdata()
        data.push(customerdata)
        console.log(data)
        dealWithJSON.writedata(data)
        console.log(chalk.green("new customer added"))
    }
    catch (error) {
        console.log(chalk.red(error.message))
    }
}
const findindex = (customerdata, key, val) => {
   const i = customerdata.findIndex(u => u[key] == val )
    return i
}
// (id, type, value, date)
const addoperation = (obj) => { 
    const customerdata = dealWithJSON.readdata()
    const index = customerdata.findIndex(u => u.id==obj.id)
    console.log(index) 
    let index2 = findindex(customerdata, "id", obj.id)
    console.log(index2) 

    let remain = customerdata[index].remainigBalance 
  

///////////////////node index.js  addop --id=1647116301504 --optype="withdraw" --value=7000
    /////////////////////////////node index.js  addop --id=1647116301504 --optype="add" --value=1555      
    
    if (obj.optype == "withdraw") {
        if (remain < obj.value) return console.log(chalk.red("balance is not enough"))
        else remain = remain - obj.value
        console.log("withdraw remain"+remain)
        
    }
    else if (obj.optype == "add") {
        if (obj.value > 6000) return console.log(chalk.red("value must be less than 6000"))
        else remain = remain + obj.value
        console.log(chalk.blue("add balance  " +remain))
        
    }
    customerdata[index].remainigBalance = remain  
    operationobj = {
        opType: obj.optype,
        val: obj.value,
        at: obj.date
    }
    console.log(operationobj)

    console.log(obj)
    customerdata[index]["operations"].push(operationobj)  
    dealWithJSON.writedata(customerdata)
    console.log(dealWithJSON.readdata()) 
}

////////////////////node index.js showcustomer --id=1647116301504 
const showcustomer = (id) => {
    const customerdata = dealWithJSON.readdata()
    // let index = findindex(customerdata, "accNum", accnum) //index=-1
    let j = 0
    
    customerdata.forEach(e => {
        j=j+1
        if (e.id == id) {
            console.log(j)
            var customer = e.name + " " + e.operations +e.accNum // name +empty +accnum
            console.log(customer)
        }
    })
    if (j == -1) console.log("customer is not found ")    
    // else  console.log(customerdata[j]) //undefiend
    // else console.log(customer)
     

}
module.exports={addcustomer,addoperation,showcustomer}

/*
// (id, type, value, date)
const addoperation = (obj) => { 
    const customerdata = dealWithJSON.readdata()
    let j = 0
    var remain=0
    customerdata.forEach(e => {
        j=j+1
        if (e.id == obj.id) {
            console.log(j)
            console.log(e)
            console.log(e.remainigBalance)
            remain = e.remainigBalance
            // break;
           
        }
    
    })
    // console.log(customerdata)
    //  console.log("test1")
    // console.log(obj.id)
    // console.log("test2")
    // const index = customerdata.findIndex(u => {
    //     console.log(chalk.red(u.id))
    //     console.log(typeof(u.id))
    //     console.log(chalk.green(obj.id))
    //      console.log(typeof(obj.id))

    //     u.id==obj.id
    // })
    // console.log(index) //-1
    // let index2 = findindex(customerdata, "id", obj.id)
    // console.log(index2) //-1

    // let remain = customerdata[4].remainigBalance //undefined  remainigBalance
    // let remain = customerdata[4] 
    // console.log(remain)  //undefined

///////////////////node index.js  addop --id=1647116301504 --optype="withdraw" --value=7000
    /////////////////////////////node index.js  addop --id=1647116301504 --optype="add" --value=1555      
    
    if (obj.optype == "withdraw") {
        if (remain < obj.value) return console.log(chalk.red("balance is not enough"))
        else remain = remain - obj.value
        console.log("withdraw remain"+remain)
        
    }
    else if (obj.optype == "add") {
        if (obj.value > 6000) return console.log(chalk.red("value must be less than 6000"))
        else remain = remain + obj.value
        console.log(chalk.blue("add balance  " +remain))
        
    }
    // customerdata[j].remainigBalance = remain  //undefind  remainigBalance
    operationobj = {
        opType: obj.optype,
        val: obj.value,
        at: obj.date
    }
    console.log(operationobj)

    console.log(obj)
    // customerdata[j]["operations"].push(operationobj)  
    // dealWithJSON.writedata(customerdata)
    // console.log(dealWithJSON.readdata()) 
}

*/ 