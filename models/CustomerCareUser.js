const validator = require('validator')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CustomerCareUserModel = new mongoose.Schema({
      email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            validate: [validator.isEmail, 'Please Enter a valid Email']
      },
      password: {
            type: String,
            required: true,
            trim: true
      },
      createdAt: {
            type: Date,
            default: Date.now()
      }
})


CustomerCareUserModel.methods.generateAuthToken = async function () {
      const user = this
      const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
      return token
}
CustomerCareUserModel.statics.findByCredentials = async (email, password) => {
      const user = await CustomerCareUser.findOne({ email })
      if (!user) {
            throw new Error('Unable to login')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
            throw new Error('Unable to login')
      }
      return user
}

// Hash the plain text password before saving
CustomerCareUserModel.pre('save', async function (next) {
      const user = this
      if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
      }
      next()
})
const CustomerCareUser = mongoose.model("CustomerCareUser", CustomerCareUserModel)
module.exports = CustomerCareUser