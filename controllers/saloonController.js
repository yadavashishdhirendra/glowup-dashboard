const SaloonSchema = require("../models/SaloonSchema");
exports.getAllSaloons = async (req, res) => {
      try {
            const saloons = await SaloonSchema.find({});
            if (!saloons.length) {
                  return res.status(400).json({
                        success: false,
                        message: "Something Went Wrong!"
                  })
            }
            return res.status(200).json({
                  success: true,
                  saloons
            })
      } catch (error) {
            res.status(500).json({
                  success: false,
                  error: error.message,
            })
      }
}