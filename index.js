let express = require("express")
let server = express()
let bodyParser = require("body-parser")
let cors = require("cors")
let env = require("dotenv")
require("./dbConfig/connection")
env.config()
let port = process.env.PORT 
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use("/uploads",express.static("uploads"))
server.use("/",require("./app"))


server.listen(port|| 8001,()=>{
console.log("Server started successfully :",port)
})


