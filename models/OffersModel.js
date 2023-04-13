const mongoose = require('mongoose');

const Offers = new mongoose.Schema({
      index: {
            type:Number
      },
      public_id: {
            type: String,
            required: false
      },
      url: {
            type: String,
            required: false
      }
})


module.exports = mongoose.model("Offers", Offers)