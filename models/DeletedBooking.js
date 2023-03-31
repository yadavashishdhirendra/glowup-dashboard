const mongoose = require('mongoose');
const DeletedBookingModel = new mongoose.Schema({
      _id: {
            type: mongoose.Schema.Types.ObjectId
      },
      date: {
            type: String,
            required: true
      },
      category: {
            type: String,
            required: true
      },
      status: {
            type: String,
            default: "Booked"
      },
      result: [{
            type: String,
            // required: true
      }],
      price: {
            type: String,
            required: true
      },
      discounted_price: {
            type: Number,
            default: 0
      },
      discounted_amount: {
            type: Number,
            default: 0
      },
      intime: {
            type: String,
            required: true
      },
      outtime: {
            type: String,
            required: true
      },
      name: {
            type: String,
            required: true
      },
      phone: {
            type: Number,
            required: true
      },
      servicetype: {
            type: String,
            required: true
      },
      selectedDate: {
            type: String,
      },
      createdAt: {
            type: Date,
            default: Date.now()
      }
})

module.exports = mongoose.model("DeletedPartnerBookings", DeletedBookingModel)