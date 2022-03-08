const customer = document.getElementById("customer")
const tableBody = document.querySelector("#tableBody")


const data  = ["name","balance","street"]
const writedatatolocalstorage = (data,key) => {
    localStorage.setItem(key,JSON.stringify(data) )
    
}
const readfromlocaldstorage = (key) => {
    let datastorge = []
    try {
        datastorge = JSON.parse(localStorage.getItem(key)) || []
        if (!Array.isArray(datastorge)) throw new Error("is not array")
    }   
    catch (e) {
        datastorge =[]
        
    }
    return datastorge
}
const createmyownelement = (parent,htmlele,txt,classes) => {
    const ele = document.createElement(htmlele)
    parent.appendChild(ele)
    if(txt) ele.textContent = txt
    if(classes) ele.className = classes
    return ele
}
deletefunc = (tabledata,index) => {
    tabledata.splice(index, 1)
    writedatatolocalstorage(tabledata, "customers")
    showtabledata()
}
editfunc = (tabledata,index) => {
   
}
makeevent= (link,index) => {
    
    localStorage.setItem("showitem", index)
    window.open(link, '_blank')
}

showrowdata = (rowdata,index,tabledata,tableBody) => {
    const row = createmyownelement(tableBody, "tr", null, null)
        createmyownelement(row, "td", index+1, null)
        createmyownelement(row, "td", rowdata.accNum, null)
        data.forEach(element => createmyownelement(row, "td",rowdata[element], null));
        const tdbuttons = createmyownelement(row, "td", null, null)
        const deletebtn=createmyownelement(tdbuttons, "button", "delete", "btn btn-danger me-2")
        const editbtn=createmyownelement(tdbuttons, "button", "edit", "btn btn-warning me-2")
        const showbtn = createmyownelement(tdbuttons, "button", "show", "btn btn-primary me-2")
        deletebtn.addEventListener("click", () => { deletefunc(tabledata, index) })
        editbtn.addEventListener("click",  () => {makeevent("showtableelement.html",index) })
        showbtn.addEventListener("click", () => {makeevent("showtableelement.html",index) })
}

showtabledata = () => {
    tableBody.innerHTML = ""
    tabledata = readfromlocaldstorage("customers")
    tabledata.forEach((rowdata,index) => {
          showrowdata(rowdata,index,tabledata,tableBody)
    });
    

}

const submitform = function (e) {
    e.preventDefault()
    let customdata={accNum : Math.floor(Math.random() * 1e6) }
    data.forEach(head =>customdata[head]=this.elements[head].value);
    const customers = readfromlocaldstorage("customers") 
    console.log(customers)
    customers.push(customdata)
    console.log(customers)
    writedatatolocalstorage(customers, "customers")
     this.reset()
    // window.location.href="index.html"
    showtabledata()
    
}



if(customer) customer.addEventListener("submit", submitform)
if (tableBody) showtabledata()
const rowshow = document.querySelector("#rowshow")
if (rowshow) {
    const tabledata = readfromlocaldstorage("customers") 
    const itemindex = localStorage.getItem("showitem")
    const item=tabledata[itemindex]
    console.log(item)
    showrowdata(item,itemindex,tabledata,rowshow)
    
}
data.forEach((head) => {
       
    })
    // showrowdata = (rowdata, index) => {
    
//     // const row = createmyownelement(showrow, "tr", "hi", null)
//     // const row = createmyownelement(showrow, "tr", null, null)
//     // createmyownelement(row, "td", index, null)
//     // data.forEach(element => {
//     //      console.log(rowdata[element])
//     // });
    
//     console.log(rowdata)
//     console.log("yes")
  

// }
