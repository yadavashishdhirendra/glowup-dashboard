const CustomerCareUser = require("../models/CustomerCareUser")

exports.registerCareUser = async (req, res) => {
      try {
            const user = await CustomerCareUser.create(req.body)
            res.status(201).json({
                  user
            })

      } catch (error) {
            console.log(error)
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.login = async (req, res) => {
      try {
            const user = await CustomerCareUser.findByCredentials(req.body.email, req.body.password)
            console.log(user)
            const token = await user.generateAuthToken()
            res.status(200).cookie("careToken", token).json({
                  success: true,
                  user,
                  token,
            });
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.profile = async (req, res) => {
      try {
            const user = await CustomerCareUser.findById(req.user._id, { password: 0 })
            res.status(200).json({
                  user
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }
}
exports.logout = async (req, res) => {
      try {
            req.user = null
            res.status(200).clearCookie("careToken").json({
                  success: true,
                  message: "loggged out"
            })
      } catch (e) {
            res.status(500).json({
                  error: e.message
            })
      }
}