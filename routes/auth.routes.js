const express = require('express');
const { getAllSaloons } = require("../controllers/saloonController");
const {
      registerWebUser,
      loginWebUser,
      logoutUser,
      getWebUser,
      addOfferImages,
      allImages,
      deleteImage
} = require('../controllers/WebUserController');
const {WebAuth }= require("../utils/authUserToken");
const router = express.Router();
const { upload } = require("../utils/multer")
router.post('/login/user/bookings', loginWebUser);
router.post('/register/user/bookings', registerWebUser);
router.get('/logout/user/bookings', WebAuth, logoutUser);
router.get('/web/user', WebAuth, getWebUser);
router.get("/saloons", WebAuth, getAllSaloons)
router.post("/offer-images",upload.any("images"), addOfferImages)
router.get("/offer-images",allImages)
router.delete("/delete-offer/:id",WebAuth,deleteImage)

module.exports = router;