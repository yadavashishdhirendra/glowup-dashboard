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