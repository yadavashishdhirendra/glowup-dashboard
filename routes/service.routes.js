const router = require('express').Router()
const { getallServicesForSaloon, updateServicesById, addServicesFromSheet } = require("../controllers/serviceController")
const { WebAuth } = require("../utils/authUserToken")
const { upload } = require("../utils/multer")
router.get("/services/:id", WebAuth, getallServicesForSaloon)
router.post("/add-services/:id", upload.single("file"), addServicesFromSheet)
router.patch("/updateservices", WebAuth, updateServicesById)
module.exports = router