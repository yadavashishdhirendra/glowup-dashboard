const DeletedCustBookingsSchema = require("../models/DeleteCustBookings")
const DeletedBookingsSchema = require("../models/DeletedBooking")

exports.deleteBookings = async (req, res) => {
      try {
            const bookings = await DeletedCustBookingsSchema.aggregate([
                  {
                        $project: {
                              _id: 0,
                              id: "$_id",
                              date: "$date",
                              client: "$owner.name",
                              mobile: "$owner.phone",
                              category: "$category",
                              service: "$servicename",
                              shopname: 1,
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
            res.status(500).json({
                  error: error.message
            })
      }
}