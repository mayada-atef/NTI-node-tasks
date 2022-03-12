const fs = require("fs")
const writedata = (date) => {
    fs.writeFileSync("customerdata.json",JSON.stringify(date))
}
const readdata = () => {
    let date = []
    try {
        date = JSON.parse(fs.readFileSync("customerdata.json"))
        if (!Array.isArray(date)) throw new Error ("data not found")
    }
    catch (e) {
        date=[]
    }
    return date
    
}
module.exports={writedata,readdata}