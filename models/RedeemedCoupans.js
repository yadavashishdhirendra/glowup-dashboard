const mongoose = require('mongoose');

const RedeemCoupanSchema = new mongoose.Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerUser"
      },
      coupan: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Coupans"
      },
}, {
      timestamps:true
})
module.exports = mongoose.model("RedeemedCoupan", RedeemCoupanSchema)