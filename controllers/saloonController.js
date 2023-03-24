const SaloonSchema = require("../models/SaloonSchema");
const { saloonTags } = require("../utils/Saloon")
const cloudinary = require('cloudinary').v2;
exports.getAllSaloons = async (req, res) => {
      try {
            const saloons = await SaloonSchema.aggregate([
                  {
                        $project: {
                              _id: 0,
                              id: "$_id",
                              owner_id: "$owner",
                              name: "$shopname",
                              images: 1,
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
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.addImages = async (req, res) => {
      try {
            const saloon = await SaloonSchema.findOne({ owner: req.params.id })
            const images = await Promise.all(
                  req.files.map(async (file) => {
                        let result = await cloudinary.uploader.upload(file.path,
                              {
                                    width: 500,
                                    height: 500,
                                    crop: 'fill',
                                    quality: 'auto',
                                    folder: 'Glowup',
                              })
                        return {
                              public_id: result.public_id,
                              url: result.secure_url
                        }
                  })
            )
            if (!saloon.images.length) {
                  saloon.images = images
                  await saloon.save()
            }
            else {
                  saloon.images.push(...images)
                  await saloon.save()
            }
            return res.status(200).json({
                  uploaded: true
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.deleteImage = async (req, res) => {
      try {
            let saloon
            const { action } = req.body
            const { owner, id } = req.query
            switch (action) {
                  case "deleteAll":
                        saloon = await SaloonSchema.findOne({ owner: owner })
                        saloon.images.map(async (image) => {
                              await cloudinary.uploader.destroy(image.public_id)
                        })
                        saloon.images = []
                        await saloon.save()
                        return res.status(200).json({
                              deleted: true
                        })
                  case "deleteOne":
                        saloon = await SaloonSchema.findOneAndUpdate({ owner: owner }, { $pull: { images: { public_id: id } } })
                        await cloudinary.uploader.destroy(id)
                        return res.status(200).json({
                              deleted: true
                        })
                  default:
                        return saloon
            }

      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}