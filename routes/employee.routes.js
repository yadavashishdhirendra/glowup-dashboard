const router = require('express').Router()
const {
      singleEmployees,
      deleteEmployee,
      editEmployee,
      addEmployee,
      getAllEmployees,
      getEmployeesByServiceId,
      removeEmployeeFromService
} = require("../controllers/employeeController")
const { WebAuth } = require("../utils/authUserToken")
router.get("/single/employee/:id", WebAuth, singleEmployees)
router.get("/employees/:id", WebAuth, getEmployeesByServiceId)
router.get("/allemployees/:id", WebAuth, getAllEmployees)
router.patch("/addemployee/:id", WebAuth, addEmployee)
router.put("/service/:serviceId/employee/:employeeId", WebAuth, removeEmployeeFromService)
router.put("/edit-employee/:id", WebAuth, editEmployee)
router.delete("/delete-employee/:employeeId", WebAuth, deleteEmployee)

module.exports = router