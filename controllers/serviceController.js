const ServicesSchema = require("../models/ServicesSchema")
const SaloonSchema = require("../models/SaloonSchema")
const { ReadExcelFile } = require("../utils/excelFileUtil")
const { Types } = require("mongoose")
const UserModel = require("../models/UserModel")
exports.getallServicesForSaloon = async (req, res) => {
      try {
            const service = await SaloonSchema.aggregate([
                  {
                        $match: { _id: new Types.ObjectId(req.params.id) }
                  },
                  {
                        $lookup: {
                              from: "users",
                              localField: "owner",
                              foreignField: "_id",
                              as: "owner"
                        }
                  },
                  {
                        $lookup: {
                              from: "services",
                              localField: "owner._id",
                              foreignField: "owner",
                              as: "services"
                        }
                  },
                  {
                        $unwind: "$services"
                  },
                  {
                        $project: { "services": 1, _id: 0 }
                  },
                  {
                        $replaceRoot: { newRoot: "$services" }
                  },
                  {
                        $project: {
                              id: "$_id", servicetype: 1, category: 1, servicename: 1, hour: 1, price: 1, description: 1, myemployees: 1, owner: 1, _id: 0
                        }
                  }
            ])
            res.status(200).json({
                  success: true,
                  service
            })
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  success: false,
                  message: error.message,
            })
      }
}

exports.updateServicesById = async (req, res) => {
      try {
            const { ids, empIds, field, value } = req.body
            let query = {}
            if (field === "myemployees" && empIds.length === value.length) {
                  const response = await Promise.all(
                        (ids.map(async (id) => {
                              const service = await ServicesSchema.findByIdAndUpdate(id, { $addToSet: { myemployees: value } })
                              return service
                        }))
                  )
                  return res.status(200).json({
                        updated: response,
                        success: true
                  })
            }
            else {
                  query[field] = value
                  const response = await Promise.all(
                        (ids.map(async (id) => {
                              const service = await Services.findByIdAndUpdate(id, query)
                              return service
                        }))
                  )
                  res.status(200).json({
                        updated: response,
                        success: true
                  })
            }
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}

exports.addServicesFromSheet = async (req, res) => {
      try {
            console.log(req.file.path)
            const path = req.file.path
            const data = await ReadExcelFile(path)
            const owner = await UserModel.findById(req.params.id)
            await ServicesSchema.deleteMany({ owner: req.params.id })
            const response = await Promise.all(
                  data.map(async (service) => {
                        const newService = await ServicesSchema.create({
                              servicename: service.servicename,
                              servicetype: service.servicetype,
                              category: service.category,
                              addons: service["Add Ons"],
                              gender: service.gender,
                              hour: service.hour,
                              price: service.price,
                              newprice: service.price,
                              description: service["Description of the services"],
                              owner: req.params.id
                        })
                        owner.services.push(newService._id)
                        await owner.save()
                        return newService
                  })
            )
            res.status(200).json({
                  response
            })

      } catch (error) {
            console.log(error)
            res.status(500).json({
                  error: error.message
            })
      }
}