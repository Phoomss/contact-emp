const departmentController = require('../controller/departmentController.js')
const departmentRouter = require('express').Router()
const passport = require('passport')

departmentRouter.post('/', passport.authenticate("jwt", { session: false }), departmentController.createDepartment1)
departmentRouter.post('/department2', passport.authenticate("jwt", { session: false }), departmentController.createDepartment2)
departmentRouter.post('/department3', passport.authenticate("jwt", { session: false }), departmentController.createDepartment3)

departmentRouter.get('/', passport.authenticate("jwt", { session: false }), departmentController.getAllDepartments)
departmentRouter.get('/search', passport.authenticate("jwt", { session: false }), departmentController.getAllDepartmentsWithParams)

departmentRouter.put('/:id', passport.authenticate("jwt", { session: false }), departmentController.updateDepartment1)
departmentRouter.put('/department2/:id', passport.authenticate("jwt", { session: false }), departmentController.updateDepartment2)
departmentRouter.put('/department3/:id', passport.authenticate("jwt", { session: false }), departmentController.updateDepartment3)

departmentRouter.delete('/:id', passport.authenticate("jwt", { session: false }), departmentController.deleteDepartment1)
departmentRouter.delete('/department2:id', passport.authenticate("jwt", { session: false }), departmentController.deleteDepartment2)
departmentRouter.delete('/department3:id', passport.authenticate("jwt", { session: false }), departmentController.deleteDepartment3)

module.exports = departmentRouter;