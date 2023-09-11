const express = require('express')
const cors = require('cors')
require('dotenv').config({path: './config.env'})
require("./auth/passport")

const app = express()

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  
app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const archiveRoute = require('./routes/archiveRoute')
const companyRoute = require('./routes/companyRoute')
const contractRoute = require('./routes/contractRoute')
const employeeRoute = require('./routes/employeeRoute')
const userRoute = require('./routes/userRoute')
const hrRoute = require('./routes/hr.route')
const deptRoute = require("./routes/deptRoute")

app.use('/archive',(archiveRoute))
app.use('/company',(companyRoute))
app.use('/contract',(contractRoute))
app.use('/employee',(employeeRoute))
app.use('/emp',hrRoute)
app.use('/api/user',(userRoute))
app.use('/dept',deptRoute)

app.get("/", (req, res)=>{
  res.send("Hello from backend")
})

app.get("/api/user-test", (req, res)=>{
  res.send("Hello User")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})