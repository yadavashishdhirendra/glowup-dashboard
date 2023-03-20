const express = require('express');
const { getAllSaloons,getSingleSaloon,updateSaloonTags} = require("../controllers/saloonController");
const { WebAuth } = require("../utils/authUserToken");
const router = express.Router();
router.get("/saloons", WebAuth, getAllSaloons)
router.get("/saloon/:id",WebAuth, getSingleSaloon)
router.put("/tags-saloon",WebAuth,updateSaloonTags)
module.exports=router
