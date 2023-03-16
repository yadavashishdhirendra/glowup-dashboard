const ServicesSchema = require("../models/ServicesSchema")
const SaloonSchema = require("../models/SaloonSchema")
const {Types}=require("mongoose")
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
                              localField: "owner.services",
                              foreignField: "_id",
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
            console.log(error)
            res.status(500).json({
                  error: error.message
            })
      }
}