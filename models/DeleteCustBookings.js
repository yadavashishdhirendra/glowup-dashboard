const mongoose = require('mongoose');

const DeletedCusBookingModel = new mongoose.Schema({
      date: {
            type: String,
           
      },
      category: {
            type: String,
            
      },
      servicename: {
            type: String,
            
      },
      status: {
            type: String,
            default: "Booked"
      },
      results: [{
            type: String,
      }],
      price: {
            type: String,
            
      },
      intime: {
            type: String,
            
      },
      outtime: {
            type: String,
           
      },
      servicetype: {
            type: String,
            
      },
      paymentId: {
            type: String,
      },
      shopname: {
            type: String,
      },
      discounted_price: {
            type: Number,
            default: 0
      },
      discounted_amount: {
            type: Number,
            default: 0
      },
      paylater: {
            type: String,
      },
      selectedDate: {
            type: String,
            
      },
      owner: {
            name: {
                  type:String,
            },
            phone: {
                  type:Number
            }
            
      },
      createdAt: {
            type: Date,
            default: Date.now()
      },
      status: {
            type: String,
            default: "Booked"
      }
})

module.exports = mongoose.model("DeletedCustomerBooking", DeletedCusBookingModel)