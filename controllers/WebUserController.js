const WebUser = require('../models/UserWebModel');
const OffersSchema = require("../models/OffersModel")
const cloudinary = require('cloudinary').v2;
const Users = require("../models/UserModel")
const bcrypt = require('bcrypt');
// ROUTE 1 => REGISTER A USER
exports.registerWebUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await WebUser.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        user = await WebUser.create({
            name, email, password
        })

        // GENERATING TOKEN HERE
        const token = await user.generateCookie();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Register Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => LOGIN USER
exports.loginWebUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await WebUser.findOne({ email }).select("+password");
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't exist"
            })
        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email id or password"
            })
        }
        // GENERATING TOKEN HERE
        const token = await user.generateCookie();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.allUsers = async (req, res) => {
    try {
        const users = await Users.aggregate([
            {
                $lookup: {
                    from: "saloons",
                    localField: "_id",
                    foreignField: "owner",
                    as: "saloon"
                }
            }
            ,
            {
                $unwind: {
                    path: "$saloon",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $project: {
                    "_id": 0,
                    id: "$_id",
                    name: "$name",
                    email: "$email",
                    phone: "$mobileno",
                    saloonId: { $ifNull: ["$saloon._id", null] },
                    saloonName: { $ifNull: ["$saloon.shopname", null] },
                    mobileno: "$mobileno"
                }
            }
        ])
        return res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.changeUserPassword = async (req, res) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10)
        const user = await Users.findByIdAndUpdate(req.params.id, { $set: { password: hashPass } })
        res.status(200).json({
            user,
            updated: true
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getWebUser = async (req, res) => {
    try {
        const user = await WebUser.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
exports.addOfferImages = async (req, res) => {
    try {
        const images = await Promise.all(
            req.files.map(async (file, index) => {
                let result = await cloudinary.uploader.upload(file.path,
                    {
                        folder: 'offers',
                    })
                let count = await OffersSchema.count({})
                return await OffersSchema.create({
                    index:count,
                    public_id: result.public_id,
                    url: result.secure_url
                })
            })
        )
        return res.status(200).json({
            done: true,
            images
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.allImages = async (req, res) => {
    try {
        const images = await OffersSchema.find({}).sort({ index:1})
        return res.status(200).json({
            images
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.deleteImage = async (req, res) => {
    try {
        const image = await OffersSchema.findByIdAndDelete(req.params.id)
        await cloudinary.uploader.destroy(image.public_id)
        return res.status(200).json({
            deleted: true,
            image
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

