const Employee = require("../models/EmployeeSchema")
const ServicesSchema = require("../models/ServicesSchema")
const { Types } = require("mongoose")
const EmployeeSchema = require("../models/EmployeeSchema")
exports.singleEmployees = async (req, res) => {
      try {
            const getEmployees = await Employee.findById(req.params.id);
            if (!getEmployees) {
                  return res.status(500).json({
                        success: false,
                        message: "Employee Not Found"
                  })
            }

            res.status(200).json({
                  success: true,
                  getEmployees
            })
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            })
      }
}
exports.addEmployee = async (req, res) => {
      try {
            const { arr } = req.body
            if (!arr.length) {
                  return res.status(400).json({
                        msg: "something went wrong"
                  })
            }
            const service = await ServicesSchema.findByIdAndUpdate(req.params.id, { $addToSet: { myemployees: arr } })
            res.status(200).json({
                  success: true,
                  service
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.deleteEmployee = async (req, res) => {
      try {
            const { employeeId } = req.params
            const employee = await EmployeeSchema.findByIdAndDelete(employeeId)
            const services = await ServicesSchema.updateMany({ myemployees: { $in: [employeeId] } }, { $pull: { myemployees: employeeId } })
            if (!employee) {
                  return res.status(404).json({
                        msg: "Employee not exists or already deleted"
                  })
            }
            res.status(200).json({
                  deleted: true,
                  services,
                  employee
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.editEmployee = async (req, res) => {
      try {
            const employee = await EmployeeSchema.findByIdAndUpdate(req.params.id, req.body)
            if (!employee) {
                  return res.status(404).json({
                        msg: "Employee not found"
                  })
            }
            res.status(200).json({
                  success: true,
                  employee
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.addNewEmployee = async (req, res) => {
      try {
            const newEmployee = await EmployeeSchema.create(req.body)
            res.status(200).json({
                  newEmployee
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.getAllEmployees = async (req, res) => {
      try {
            const employees = await EmployeeSchema.aggregate([
                  {
                        $match: {
                              owner: new Types.ObjectId(req.params.id)
                        }
                  },
                  {
                        $project: {
                              id: "$_id",
                              name: { $concat: ["$firstname", " ", "$lastname"] },
                              services: 1,
                              status: "$status",
                              intime: "$intime",
                              outtime: "$outtime",
                              _id: 0
                        }
                  }
            ])
            res.status(200).json({
                  employees
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.getEmployeesByServiceId = async (req, res) => {
      try {
            const employees = await ServicesSchema.aggregate([
                  {
                        $match: {
                              _id: new Types.ObjectId(req.params.id)
                        }
                  }, {
                        $lookup: {
                              from: "employees",
                              localField: "myemployees",
                              foreignField: "_id",
                              as: "myemployees"
                        }
                  },
                  {
                        $project: {
                              myemployees: 1, _id: 0
                        }
                  },
                  {
                        $unwind: "$myemployees"
                  },
                  {
                        $replaceRoot: { newRoot: "$myemployees" }
                  },
                  {
                        $project: {
                              id: "$_id", name: { $concat: ["$firstname", " ", "$lastname"] }, status: 1, intime: 1, outtime: 1
                        }
                  }
            ])
            if (!employees) {
                  return res.status(400).json({
                        success: false,
                        message: "No Employees Found"
                  })
            }
            res.status(200).json({
                  success: true,
                  serviceEmployees: employees
            })
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message,
            })
      }
}
exports.removeEmployeeFromService = async (req, res) => {
      try {
            const { serviceId, employeeId } = req.params
            const service = await ServicesSchema.findByIdAndUpdate(serviceId, {
                  $pull: { myemployees: employeeId }
            })
            res.status(200).json({
                  service,
                  deleted: true
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.getServicesOfSingleEmployee = async (req, res) => {
      try {
            const services = await ServicesSchema.aggregate([
                  {
                        $match: {
                              myemployees: {
                                    $in: [new Types.ObjectId(req.params.id)]
                              }
                        }
                  },
                  {
                        $project: {
                              id: "$_id",
                              servicetype: 1,
                              about: 1,
                              category: 1,
                              servicename: 1,
                              hour: 1,
                              price: 1,
                              newprice: 1,
                              description: 1,
                              myemployees: 1,
                              owner: 1,
                              _id: 0
                        }
                  }

            ])
            res.status(200).json({
                  services
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}