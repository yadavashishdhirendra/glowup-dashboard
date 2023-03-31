const router = require('express').Router()
const { addCoupan, fetchCoupansForDsahboard, fetchCategories, deleteCoupan } = require("../controllers/coupanController")
const { WebAuth } = require("../utils/authUserToken")
router.post("/generate-coupan", WebAuth, addCoupan)
router.get("/coupans", WebAuth, fetchCoupansForDsahboard)
router.get("/categories", WebAuth, fetchCategories)
router.delete("/delete-coupan/:id", WebAuth, deleteCoupan)
module.exports = router