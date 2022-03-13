const Customer = require("./controller/customer")
const yargs = require("yargs")
const { argv } = require("yargs")



yargs.command({
    command:"addcustomer",
    describe: "add new customer",
    builder: {
        name: {
            // type:string,
            // required:true
        }, 
       
        intialBalance: { default:1000},
        remainigBalance: { default: 1000 },
        operations: {
            default:[]
        }
    },
    handler: function (argv) {
         console.log("test add customer")
        let customerdata = {
            name: argv.name,
            accNum:Math.floor(Math.random() * 1e6),
            intialBalance: argv.intialBalance,
            remainigBalance: argv.remainigBalance,
            operations: argv.operations,
            id:Date.now()  
        }
         
         Customer.addcustomer(customerdata)
        
    }
    
})
yargs.command({
    command:"addop",
    describe: "add new operation",
    builder: {
        // accNum: {
        //     // required:true
        // },
          id:{

        },
        optype: {
            type: String,
            // required:true
        },
        value:{
            // type: Number,
            // required:true
        },
      
    },
    handler: function (argv) {
        let opdata = {
            // accNum:argv.accNum,
            id:argv.id,
            optype:argv.optype,
            value:argv.value,
            date:Date.now()    
        }
        Customer.addoperation(opdata)
        
    }
    
})
yargs.command({
    command:"showcustomer",
    describe: "show customer operation",
    builder: {
        id:{}
             
    }
   ,
    handler: function () {
         Customer.showcustomer(argv.id)
        
    }
    
})
yargs.argv
// yargs.command({
//     command:"show customers",
//     describe: "show all customers",
//     handler: function () {
//          Customer.showall
        
//     }
    
// })



// cutomers => name, accNum, intialBalance, remainigBalance, 
//     operations: [{ opType: "with", val: 100, at: "date" }]

// on yargs 
// add customer => {
//     accNum:1,
//     name:"marwa",
//     intialBalance:1000,
//     remainigBalance:1000,
//     operations:[]
// }
// => add Customer 
// => add operation => builder => opType, opValue
// if withdraw remainigBalance> opValue
// else add  opValue<6000
// => show user
// name- ....
// operation
// - val: 100   type:add   time:-----
// - val:200    type:with   time:----