const express =  require('express')
const cors = require('cors')
const mongoose = require ('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const UserRoutes = require("./Routes/UserRoutes")
const todoRoutes = require("./Routes/TodoRoute")

const PORT = process.env.PORT || 8080
const DB = process.env.DB_URI
const app = express()
app.use(express.json())
app.use(cors())

const connect = async() => {
try {
    mongoose.connect(DB)
    console.log("CONNECTED TO DATABASE")
} catch (error) {
    console.log9("FAILED TO CONNECT TO DATABSE")
}
}

connect()

app.use("/api/users/" , UserRoutes)
app.use("/api/todos/" , todoRoutes)

app.listen( PORT , console.log("Server is running") )