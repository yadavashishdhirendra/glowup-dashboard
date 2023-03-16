const CustomerBookingModel = require("../models/CustomerBookingModel")
const SaloonSchema = require("../models/SaloonSchema")
const myCache = require("../utils/cache")
const {Types}=require("mongoose")
exports.totalAmount = async (req, res) => {
      try {
            const { start, end } = req.body
            const bookings = await CustomerBookingModel.aggregate([
                  {
                        $match: {
                              paymentId: {
                                    $exists: true
                              }
                        }
                  },
                  {
                        $project: {
                              serviceId: 1,
                              owner: 1,
                              price: {
                                    $convert: {
                                          input: "$price",
                                          to: "int"
                                    }
                              },
                              discounted_price: 1,
                              discounted_amount: 1
                              , shopname: 1,
                              selectedDate: {
                                    $convert: {
                                          input: "$selectedDate",
                                          to: "date",
                                          onError: "An error occurred",
                                          onNull: "Input was null or empty"
                                    }
                              }
                        }
                  }, {
                        $match: {
                              selectedDate: {
                                    $gte: new Date(start), $lte: new Date(end)
                              },
                        }
                  },
                  {
                        $lookup: {
                              from: "saloons",
                              foreignField: "shopname",
                              localField: "shopname",
                              as: "saloon"
                        }
                  },
                  { $unwind: "$saloon" },
                  {
                        $group: {
                              _id: {
                                    id: "$saloon._id",
                                    name: "$saloon.shopname",
                              },
                              overAllDiscount: {
                                    $sum: "$discounted_amount"
                              },
                              totatAmountWithDiscount: {
                                    $sum: "$discounted_price"
                              },
                              totalAmount: { $sum: "$price" },
                        }
                  }, {
                        $project: {
                              _id: 0,
                              id: "$_id.id",
                              name: "$_id.name",
                              totalAmount: 1,
                              totatAmountWithDiscount: 1,
                              overAllDiscount: 1

                        }
                  }
            ])
            res.status(200).json({
                  bookings
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.getAllBookingsOfSaloon = async (req, res) => {
      try {
            const bookings = await SaloonSchema.aggregate([{
                  $match: {
                        _id: new Types.ObjectId(req.params.id)
                  }
            }
                  , {
                  $lookup: {
                        from: "customerbookings",
                        foreignField: "shopname",
                        localField: "shopname",
                        as: "bookings",
                  }
            }, {
                  $unwind: "$bookings"
            }, {
                  $project: {
                        bookings: 1, _id: 0
                  }
            },
            {
                  $replaceRoot: {
                        newRoot: "$bookings"
                  }
            },
            {
                  $lookup: {
                        from: "customerusers",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                  }
            },
            {
                  $lookup: {
                        from: "employees",
                        localField: "asignee",
                        foreignField: "_id",
                        as: "asignee"
                  }
            },
            { $unwind: "$owner" },
            {
                  $unwind: {
                        path: "$asignee",
                        "preserveNullAndEmptyArrays": true
                  }
            },
            {
                  $project: {
                        _id: 0,
                        id: "$_id",
                        stylist: { $concat: ["$asignee.firstname", " ", "$asignee.lastname"] },
                        date: "$date",
                        client: "$owner.name",
                        mobile: "$owner.phone",
                        category: "$category",
                        service: "$servicename",
                        status: "$status",
                        price: {
                              $cond: { if: { $eq: ["$price", "0"] }, then: "Custom", else: "$price" }
                        },
                        intime: "$intime",
                        outtime: "$outtime",
                        discounted_amount: 1,
                        discounted_price: 1,
                  }
            }

            ])
            res.status(200).json({
                  bookings
            })
      } catch (error) {
            res.json({
                  error: error.message
            })
      }
}
exports.getSpecificDateBooking = async (req, res) => {
      try {
            const { selectedDate } = req.body
            const newDate = new Date(Date.now()).toISOString().split('T')[0]
            let date = selectedDate ? selectedDate : newDate
            let response = await myCache.get(date)
            if (response) {
                  return res.status(200).json({
                        from: "cached",
                        bookings: JSON.parse(response)
                  })
            }
            else {
                  const project = {
                        serviceId: 1,
                        category: 1,
                        status: 1,
                        owner: 1,
                        servicename: 1,
                        price: {
                              $convert: {
                                    input: "$price",
                                    to: "int"
                              }
                        },
                        paymentId: 1,
                        paylater: 1,
                        discounted_price: 1,
                        discounted_amount: 1,
                        shopname: 1,
                        createdAt: 1
                  }
                  const bookings = await CustomerBookingModel.aggregate([
                        {
                              $project: {
                                    ...project,
                                    bookingDate: {
                                          $convert: {
                                                input: "$selectedDate",
                                                to: "date",
                                                onError: "An error occurred",
                                                onNull: "Input was null or empty"
                                          }
                                    }
                              }
                        },
                        {
                              $project: {
                                    ...project,
                                    bookingDate: 1,
                                    formattedDate: {
                                          "$dateToString": {
                                                "format": "%Y-%m-%d",
                                                "date": "$bookingDate"
                                          }
                                    }
                              }
                        },
                        {
                              $match: {
                                    formattedDate: date
                              }
                        },
                        {
                              $lookup: {
                                    from: "saloons",
                                    foreignField: "shopname",
                                    localField: "shopname",
                                    as: "saloon"
                              }
                        },
                        {
                              $unwind: "$saloon"
                        },
                        {
                              $lookup: {
                                    from: "users",
                                    foreignField: "_id",
                                    localField: "saloon.owner",
                                    as: "saloon.owner"
                              }
                        },
                        {
                              $lookup: {
                                    from: "customerusers",
                                    foreignField: "_id",
                                    localField: "owner",
                                    as: "owner"
                              }
                        },
                        {
                              $lookup: {
                                    from: "services",
                                    foreignField: "_id",
                                    localField: "serviceId",
                                    as: "service"
                              }
                        },
                        { $unwind: "$saloon.owner" },
                        { $unwind: "$owner" },
                        {
                              $unwind: {
                                    path: "$service",
                                    "preserveNullAndEmptyArrays": true
                              }
                        },
                        { $sort: { bookingDate: 1 } },
                        {
                              $project: {
                                    _id: 0,
                                    id: "$_id",
                                    saloon: "$shopname",
                                    saloon_no: "$saloon.owner.mobileno",
                                    category: "$category",
                                    service: "$servicename",
                                    customer: "$owner.name",
                                    customerId: "$owner._id",
                                    customer_no: "$owner.phone",
                                    date: "$formattedDate",
                                    booking_date_time: "$bookingDate",
                                    paymentId: 1,
                                    paylater: 1,
                                    payment: { $cond: [{ $eq: ["$paylater", "Pay Later"] }, "Pay Later", "Paid"] }
                              }
                        }
                  ])
                  myCache.set(date, JSON.stringify(bookings), 300)
                  res.status(200).json({
                        cached: false,
                        bookings
                  })
            }

      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.allBookingsWeb = async (req, res) => {
      try {
            let respone = await myCache.get("bookings")
            if (respone) {
                  return res.status(200).json({
                        cached: true,
                        success: true,
                        bookings: JSON.parse(respone)
                  })
            }
            const bookings = await CustomerBookingModel.aggregate([
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
                              from: "employees",
                              localField: "asignee",
                              foreignField: "_id",
                              as: "asignee"
                        }
                  },
                  { $unwind: "$owner" },
                  {
                        $lookup: {
                              from: "saloons",
                              localField: "owner.saloon",
                              foreignField: "_id",
                              as: "owner.saloon"
                        }
                  },
                  { $unwind: "$owner.saloon" },
                  {
                        $unwind: {
                              path: "$asignee",
                              "preserveNullAndEmptyArrays": true
                        }
                  },
                  {
                        $project: {
                              id: "$_id",
                              stylist: { $concat: ["$asignee.firstname", " ", "$asignee.lastname"] },
                              date: "$date",
                              salon: "$owner.saloon.shopname",
                              client: "$name",
                              mobile: "$phone",
                              category: "$category",
                              service: "$service",
                              status: "$status",
                              price: {
                                    $cond: { if: { $eq: ["$price", "0"] }, then: "Custom", else: "$price" }
                              },
                              intime: "$intime",
                              outtime: "$outtime"
                        }
                  }
            ])
            myCache.set("bookings", JSON.stringify(bookings), 300)
            return res.status(200).json({
                  success: true,
                  bookings
            })
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message,
            })
      }
}