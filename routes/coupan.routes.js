const router = require('express').Router()
const { addCoupan, fetchCoupansForDsahboard } = require("../controllers/coupanController")
const { WebAuth } = require("../utils/authUserToken")
router.post("/generate-coupan",WebAuth,addCoupan)
router.get("/coupans",WebAuth,fetchCoupansForDsahboard)
module.exports=router