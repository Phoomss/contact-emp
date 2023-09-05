const deptController = require("../controller/deptController")
const deptRoute = require('express').Router()
const passport = require('passport')

deptRoute.get('/:name', passport.authenticate("jwt", { session: false }), deptController.getDepartments);

module.exports = deptRoute