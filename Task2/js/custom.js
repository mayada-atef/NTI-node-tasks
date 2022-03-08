const newssection = document.getElementById("newssection")
const tablebody=document.getElementById("tablebody")
function apiget(link,callback) {
    fetch(link).then(
        (x) => {
        //console.log(x)
            x.json().then(
                (y) => callback(y,false))
            .catch ((err) => callback(false,err.message))
        }
    )
        .catch(
        (e) => callback(false,e.message) )
}

// "https://newsapi.org/v2/everything?q=bitcoin&apiKey=2ee045fe62e94d61a8cb7530fb714b16" 
// "https://jsonplaceholder.typicode.com/users"
//   "https://jsonplaceholder.typicode.com/photos?_limit=10"      
apiget("https://jsonplaceholder.typicode.com/photos?_limit=10",
    (response, error) => {
        if (error) console.log(error)
        else {
            // response.forEach(element => {
            //       console.log(element["url"])
            // });
            console.log(response) 
            sec1(response)
        }
    }
)
apiget("https://jsonplaceholder.typicode.com/users",
    (response, error) => {
        if (error) console.log(error)
        else {
            console.log(response) 
            sec2(response)
        }
    }
)
   
const createmyownelement = (parent, htmlele, txt, classes) => {
    const ele = document.createElement(htmlele)
    parent.appendChild(ele)
    if(txt) ele.textContent = txt
    if(classes) ele.className = classes
    return ele
}
function sec1( response) {
    console.log(1) 
    const div = createmyownelement(newssection, "div", null, null) 
    const row = createmyownelement(div, "div", null, "row")
    response.forEach(element => {
        const col = createmyownelement(row, "div", "col", "col-lg-3 col-md-6 border border-primary")
        const coldiv = createmyownelement(col, "div", null, null)
        const p = createmyownelement(coldiv, "p",element["title"],null )
        const link = createmyownelement(coldiv, "a", "from web site", "text-danger")
        link.href=element["thumbnailUrl"]
        const img = createmyownelement(coldiv, "img", null, "img-fluid")
        img.src=element["url"]
    })
}

function sec2(response) {
     console.log(2) 
    const tr = createmyownelement(tablebody, "tr", null, null)
    data = ["name", "email", "address", "company"]
    let text=""
    response.forEach(reselement => {
        data.forEach((objelement) => {
            if (objelement == "company")text += objelement+":"+reselement[objelement]["bs"]+"|||||||||||||"
        
            else if(objelement == "address")text += objelement+":"+reselement[objelement]["street"]+" ||||||||||||| "
            else text += objelement+":"+reselement[objelement]+"|||||||||||||  "
        })
        const p = createmyownelement(tr, "p",text,null )
        console.log(reselement)
        console.log(reselement.street.geo.lng)


    })
}





// // fetch("http://jsonplaceholder.typicode.com/todos/").then((response) =>
// //     response.json().then((result) => {
// //         console.log(result);
// // }))




// function getApi(link) {
//     fetch(link)
//         .then((x) => {
//             x.json().then((y) => {
//                 y.articles.forEach(element => {
//                     document.querySelector(".row").innerHTML += `<div class='col-md-4 my-3 p-2'><div class="card p-2" style="width: 18rem;"><h5 class="card-title">${element.source.name}</h5>
//                <img src="${element.urlToImage}" class="card-img-top" height:15rem; alt="..."><h5 class="card-title">${element.title}</h5>
//                <div class="card-body">
//                  <p class="card-text">${element.content}</p> <a href="#" class="card-link">${element.url}</a>
//                </div>
//              </div></div>`
//                 });
//             })
//         }).catch((err) => {
//             console.log(err);
//         })





















 
