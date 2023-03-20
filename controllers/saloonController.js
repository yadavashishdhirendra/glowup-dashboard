const SaloonSchema = require("../models/SaloonSchema");
const { saloonTags } = require("../utils/Saloon")
exports.getAllSaloons = async (req, res) => {
      try {
            const saloons = await SaloonSchema.aggregate([
                  {
                        $project: {
                              _id: 0,
                              id: "$_id",
                              owner_id: "$owner",
                              name: "$shopname",
                              address: { $concat: ["$address", ",", "$addresssec", ",", "$city", "$pincode"] },
                              ratings: "$ratings",
                              keys: "$tags"
                        }
                  }
            ]);
            if (!saloons.length) {
                  return res.status(400).json({
                        success: false,
                        message: "Something Went Wrong!"
                  })
            }
            return res.status(200).json({
                  success: true,
                  saloons
            })
      } catch (error) {
            res.status(500).json({
                  success: false,
                  error: error.message,
            })
      }
}
exports.getSingleSaloon = async (req, res) => {
      try {
            const saloon = await SaloonSchema.findById(req.params.id)
            res.status(200).json({
                  saloon
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.updateSaloonTags = async (req, res) => {
      try {
            const { action, ids, values } = req.body
            switch (action) {
                  case 'Add':
                        return await saloonTags(ids, "$addToSet", values, res)
                  case "AddAllKeys":
                        return await saloonTags(ids, "$addToSet", values, res)
                  case "Remove":
                        return await saloonTags(ids, "$pull", values, res)
                  case "RemoveAllKeys":
                        return await saloonTags(ids, "$set", [], res)
                  default:
                        break;
            }
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  error: error.message
            })
      }
}