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
const departmentRouter = require('./routes/departmentRoute')

app.use('/archive',(archiveRoute))
app.use('/company',(companyRoute))
app.use('/contract',(contractRoute))
app.use('/employee',(employeeRoute))
app.use('/emp',hrRoute)
app.use('/user',(userRoute))
app.use('/department',(departmentRouter))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})