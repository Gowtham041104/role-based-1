let express = require("express")
let app_server = express()

app_server.use("/api/auth",require("./controller/authController"))
app_server.use("/api/form",require(("./controller/formController")))
app_server.use("/api/feedback",require(("./controller/feedbackController")))






module.exports = app_server