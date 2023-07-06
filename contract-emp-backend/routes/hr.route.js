const express = require('express');
const app = express.Router();
const controller = require('../controller/hr.controller')

app.get("/:emp_id", controller.getEmpData)


module.exports = app
