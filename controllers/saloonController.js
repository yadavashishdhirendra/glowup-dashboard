const SaloonSchema = require("../models/SaloonSchema");
const { saloonTags } = require("../utils/Saloon")
const cloudinary = require('cloudinary').v2;
const UserSchema = require("../models/UserModel")
const ServicesSchema = require("../models/ServicesSchema");
const CustomerBookings = require("../models/CustomerBookingModel")
const BookingsSchema = require("../models/BookingModel")
const DeletedCustBookingsSchema = require("../models/DeleteCustBookings")
const DeletedBookingsSchema = require("../models/DeletedBooking")
const EmployeeSchema = require("../models/EmployeeSchema");
const { emit } = require("../models/CustomerCareUser");
exports.createUserAccount = async (req, res) => {
      try {
            const { email, phone, password, name } = req.body
            const newUser = await UserSchema.create({
                  email,
                  password,
                  name,
                  mobileno: phone
            })
            return res.status(201).json({
                  done: true,
                  newUser
            })
      } catch (error) {
            if (error.keyPattern.email) {
                  return res.status(500).json({
                        error: `${error.keyValue.email} is already in use`
                  })
            }
            return res.status(500).json({
                  error: error.message
            })
      }
}
exports.createNewSaloon = async (req, res) => {
      try {
            const newSalon = await SaloonSchema.create(req.body)
            const user = await UserSchema.findById(req.body.owner)
            user.saloon.push(newSalon._id)
            await user.save()
            return res.status(201).json({
                  newSalon
            })
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            })
      }
}
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
                              keys: "$tags",
                              offers: 1,
                              description: 1
                        }
                  }, {
                        $sort: {
                              name: 1
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
                  case "Remove":
                        return await saloonTags(ids, "$pull", { $in: values }, res)
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
exports.deleteSaloon = async (req, res) => {
      try {
            const { id } = req.params
            const salon = await SaloonSchema.findByIdAndDelete(id)
            const customerBookings = await CustomerBookings.find({ shopname: salon.shopname }).populate("owner")
            const owner = await UserSchema.findByIdAndDelete(salon.owner)
            const services = await Promise.all(
                  owner.services.map(async (ser) => {
                        const service = await ServicesSchema.findByIdAndDelete(ser)
                        return service
                  })
            )
            const employees = await Promise.all(
                  owner.employees.map(async (emp) => {
                        return await EmployeeSchema.findByIdAndDelete(emp)
                  })
            )
            const deleteCustomerBookings = await Promise.all(
                  customerBookings.map(async (book) => {
                        const booking = await CustomerBookings.findByIdAndDelete(book._id).populate("owner")
                        return booking
                  })
            )
            const salonBookings = await BookingsSchema.find({ owner: owner._id })
            const deletePartnerBookings = await Promise.all(
                  salonBookings.map(async (book) => {
                        const booking = await BookingsSchema.findByIdAndDelete(book._id)
                        return booking
                  })
            )
            await DeletedCustBookingsSchema.insertMany(deleteCustomerBookings)
            await DeletedBookingsSchema.insertMany(salonBookings)
            res.status(200).json({
                  deleted: true,
                  salon,
                  owner,
                  services,
                  deleteCustomerBookings,
                  deletePartnerBookings,
                  employees
            })

      } catch (error) {
            return res.status(500).json({
                  error: error.message
            })
      }
}
// exports.addOffersField = async (req, res) => {
//       try {
//             const { text } = req.body
//             const salon = await SaloonSchema.findByIdAndUpdate(req.params.id, {
//                   $set: {
//                         offers: text
//                   }
//             })
//             return res.status(200).json({
//                   done: true,
//                   salon
//             })
//       } catch (error) {
//             return res.status(500).json({
//                   error: error.message
//             })
//       }
// }
exports.updateSalon = async (req, res) => {
      try {
            const salon = await SaloonSchema.findByIdAndUpdate(req.params.id, {
                  $set: {
                        ...req.body
                  }
            })
            return res.status(200).json({
                  done: true,
                  salon
            })
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            })
      }
}
exports.changeImagesPosition = async (req, res) => {
      try {
            const { images } = req.body
            const { id } = req.params
            const salon = await SaloonSchema.findByIdAndUpdate(id, { $set: { images } })
            return res.status(200).json({
                  salon,
                  done: true
            })
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            })
      }
}