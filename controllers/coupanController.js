const { Types } = require("mongoose");
const CoupanModel = require("../models/CoupansModel")
const ServicesModel = require("../models/ServicesSchema")
const cc = require('coupon-code');
exports.addCoupan = async (req, res) => {
      try {
            let code = cc.generate({ partLen: 6 })
            const newCoupan = await CoupanModel.create({
                  code,
                  ...req.body,
                  expireAt: new Date(`${req.body.valid_till}T00:00`)
            })
            res.status(200).json({
                  success: true,
                  newCoupan
            })
      } catch (error) {
            res.status(500).json({
                  err: error.message
            })
      }
}
exports.fetchCoupansForDsahboard = async (req, res) => {
      try {
            const project = {
                  _id: 0,
                  id: "$_id",
                  code: 1,
                  name: 1,
                  description: 1,
                  expireAt: "$valid_till",
                  all_vendors: 1,
                  selected_vendors: 1,
                  category: 1
            }
            const coupans = await CoupanModel.aggregate([
                  {
                        $project: project
                  }
            ])
            res.status(200).json({
                  coupans
            })
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.fetchCategories = async (req, res) => {
      try {
            const categories = await ServicesModel.aggregate([
                  {
                        $group: {
                              _id: "$servicetype"
                        }
                  }, {
                        $project: {
                              _id: 0,
                              category: "$_id"
                        }
                  }
            ])
            categories.push({ category: "All" })
            res.status(200).json({
                  categories
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.getCoupan = async (req, res) => {
      try {
            let project = {
                  _id: 1,
                  name: 1,
                  code: 1,
                  category: 1,
                  gender: 1,
                  maxDiscount: 1,
                  discountPercentage: 1,
                  min_amount: 1,
                  description: 1,
                  valid_till: 1,
                  valid_from: 1,
                  usage_limit: 1,
                  time_period: 1,
                  all_vendors: 1,
            }
            const coupan = await CoupanModel.aggregate([
                  {
                        $match: {
                              _id: new Types.ObjectId(req.params.id)
                        }
                  },
                  {
                        $lookup: {
                              from: "saloons",
                              localField: "selected_vendors",
                              foreignField: "_id",
                              as: "selected_vendors"
                        }
                  },
                  {
                        $unwind: {
                              path: "$selected_vendors",
                              preserveNullAndEmptyArrays: true
                        }
                  },

                  {
                        $project: {
                              ...project,
                              selected_vendors: {
                                    id: "$selected_vendors._id",
                                    name: "$selected_vendors.shopname"
                              }
                        }
                  },
                  {
                        $group: {
                              _id: {
                                    id: "$_id",
                                    name: "$name",
                                    code: "$code",
                                    category: "$category",
                                    gender: "$gender",
                                    maxDiscount: "$maxDiscount",
                                    discountPercentage: "$discountPercentage",
                                    min_amount: "$min_amount",
                                    description: "$description",
                                    valid_till: "$valid_till",
                                    valid_from: "$valid_from",
                                    usage_limit: "$usage_limit",
                                    time_period: "$time_period",
                                    all_vendors: "$all_vendors",

                              },
                              selected_vendors: {
                                    $push: "$selected_vendors"
                              }
                        }
                  },
                  {
                        $project: {
                              _id: "$_id.id",
                              name: "$_id.name",
                              code: "$_id.code",
                              category: "$_id.category",
                              gender: "$_id.gender",
                              maxDiscount: "$_id.maxDiscount",
                              discountPercentage: "$_id.discountPercentage",
                              min_amount: "$_id.min_amount",
                              description: "$_id.description",
                              valid_till: "$_id.valid_till",
                              valid_from: "$_id.valid_from",
                              usage_limit: "$_id.usage_limit",
                              time_period: "$_id.time_period",
                              all_vendors: "$_id.all_vendors",
                              selected_vendors: {
                                    $filter: {
                                          input: "$selected_vendors",
                                          as: "item",
                                          cond: { $ne: ["$$item", {}] }
                                    }
                              }
                        }
                  },
            ])
            res.status(200).json({
                  coupan: coupan[0]
            })
      } catch (error) {

            res.status(500).json({
                  err: error.message
            })
      }
}
exports.upDateCoupan = async (req, res) => {
      try {
            const done = await CoupanModel.findByIdAndUpdate(req.params.id,
                  {
                        $set:
                        {
                              ...req.body,
                              expireAt: new Date(`${req.body.valid_till}T00:00`)
                        }
                  })
            res.status(200).json({
                  done: true
            })
      } catch (error) {
            res.status(500).json({
                  err: error.message
            })
      }
}
exports.deleteCoupan = async (req, res) => {
      try {
            const deletedCoupan = await CoupanModel.findByIdAndDelete(req.params.id)
            res.status(200).json({
                  deletedCoupan
            })
      } catch (error) {
            res.status(500).json({
                  err: error.message
            })
      }
}