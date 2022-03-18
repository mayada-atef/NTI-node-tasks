const path = require("path")
const hbs = require("hbs")
const express = require("express")
const app = express()

const viewsDir = path.join(__dirname, "../resources/views")
const layoutsDir = path.join(__dirname, "../resources/layouts")
const routesDir = require("../routes/customer.routes.js")

app.set("view engine", "hbs")
app.set("views", viewsDir)
hbs.registerPartials(layoutsDir)
app.use(express.urlencoded({extended:true}))

app.use(routesDir)



module.exports=app