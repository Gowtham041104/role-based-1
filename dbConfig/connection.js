let mongoose = require("mongoose")
let env = require("dotenv")
env.config()

let dbConnection = async ()=>{
    let db = process.env.DB
    try {
       await mongoose.connect(db)
        console.log("DataBase connected successfully")
    } catch (error) {
        console.log(error)
    }
}

dbConnection()