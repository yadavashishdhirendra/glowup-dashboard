const mongoose = require('mongoose');

const AddOnSchema = new mongoose.Schema({
      category: {
            type: String,
      },
      servicename: {
            type: String,
            trim: true,
            lowercase: true
      },
      gender: {
            type: String,
      },
      price: {
            type: String,
      },
      owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
      },
}, {
      timestamps: true
})

module.exports = mongoose.model("AddOns", AddOnSchema)
