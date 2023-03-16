const router = require('express').Router()
const { getallServicesForSaloon, updateServicesById } = require("../controllers/serviceController")
const { WebAuth } = require("../utils/authUserToken")
router.get("/services/:id", WebAuth, getallServicesForSaloon)
router.patch("/updateservices", WebAuth, updateServicesById)
module.exports = router