const customer = document.getElementById("customer")
const tableBody = document.querySelector("#tableBody")
const rowshow = document.querySelector("#rowshow")

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

showrowdata = (rowdata,index,tabledata) => {
    const row = createmyownelement(tableBody, "tr", null, null)
        createmyownelement(row, "td", index+1, null)
        const accNum = Math.floor(Math.random() * 1e6);
        createmyownelement(row, "td", accNum, null)
        data.forEach(element => createmyownelement(row, "td",rowdata[element], null));
        const tdbuttons = createmyownelement(row, "td", null, null)
        const deletebtn=createmyownelement(tdbuttons, "button", "delete", "btn btn-danger me-2")
        const editbtn=createmyownelement(tdbuttons, "button", "edit", "btn btn-warning me-2")
        const showbtn = createmyownelement(tdbuttons, "button", "show", "btn btn-primary me-2")
        deletebtn.addEventListener("click", () => { deletefunc(tabledata, index) })
        editbtn.addEventListener("click", () => { editfunc(tabledata, index) })
        showbtn.addEventListener("click", () => {
            window.open("showtableelement.html", '_parent');
           console.log(document.innerHTML)
            const rowshow = document.querySelector("#rowshow")
            console.log(rowshow)

            if (rowshow) showrowdata(rowdata, index)
        })
}

showtabledata = () => {
    tableBody.innerHTML = ""
    tabledata = readfromlocaldstorage("customers")
    tabledata.forEach((rowdata,index) => {
          showrowdata(rowdata,index,tabledata)
    });
    

}
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

const submitform = function (e) {
    e.preventDefault()
    let customdata={}
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




