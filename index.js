const express = require('express');
const app = express();
let bodyParser = require("body-parser")
let cors = require("cors")
let env = require("dotenv")
require("./dbConfig/connection")
env.config()
let port = process.env.PORT 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/",require("./app"))

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
})

app.listen(port, () => {
  console.log(`Server started successfully : ${port}`);
})

