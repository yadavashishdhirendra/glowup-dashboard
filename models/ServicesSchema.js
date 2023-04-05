const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    servicetype: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    servicename: {
        type: String,
        trim: true,
        lowercase: true
    },
    hour: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    about: {
        type: String,
    },
    description: {
        type: String,
    },
    gender: {
        type: String,
    },
    addons: {
        type: String,
    },
    newprice: {
        type: Number,
    },
    myemployees: [{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Employee"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Services", ServicesSchema)