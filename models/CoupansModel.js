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
            required: true
      },
      discountPercentage: {
            type: Number,
            required: true
      },
      min_amount: {
            type: Number,
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