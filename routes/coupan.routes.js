const router = require('express').Router()
const { addCoupan, fetchCoupansForDsahboard,fetchCategories} = require("../controllers/coupanController")
const { WebAuth } = require("../utils/authUserToken")
router.post("/generate-coupan",WebAuth,addCoupan)
router.get("/coupans", WebAuth, fetchCoupansForDsahboard)
router.get("/categories",fetchCategories)
module.exports=router