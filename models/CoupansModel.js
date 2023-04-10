const mongoose = require('mongoose');
const coupanSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      code: {
            type: String,
            required: true
      },
      category: {
            type: String,
      },
      gender: {
            type:String
      },
      maxDiscount: {
            type: Number,
            default:0
      },
      discountPercentage: {
            type: Number,
            default: 0
      },
      min_amount: {
            type: Number,
            default: 0
      },
      description: {
            type: String
      },
      valid_from: {
            type: String
      },
      valid_till: {
            type: String
      },
      usage_limit: {
            type: Number
      },
      time_period: {
            type: Number
      },
      all_vendors: {
            type: String
      },
      selected_vendors: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Saloon",
            }
      ],
      expireAt: {
            type: Date
      }

}, {
      timestamps: true
})
coupanSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 })
module.exports = mongoose.model("Coupans", coupanSchema)