const jwt = require('jsonwebtoken');
const WebUserModel = require('../models/UserWebModel');
const dotenv = require("dotenv")
const CustomerCareUser = require("../models/CustomerCareUser")
dotenv.config()
const WebAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Login First",
            })
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await WebUserModel.findById(decodeData.id);
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const isCareUser = async (req, res, next) => {
    const { careToken } = req.cookies;
    if (!careToken) {
        return res.status(401).json({
            error: "Please login"
        })
    }
    const decodeToken = jwt.verify(careToken, process.env.JWT_SECRET)
    req.user = await CustomerCareUser.findById(decodeToken._id)
    next()
}
module.exports = {WebAuth,isCareUser};