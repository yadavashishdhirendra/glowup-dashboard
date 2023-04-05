const express = require('express');
const { getAllSaloons } = require("../controllers/saloonController");
const {
      registerWebUser,
      loginWebUser,
      logoutUser,
      getWebUser,
      addOfferImages,
      allImages,
      deleteImage,
      allUsers,
      changeUserPassword
} = require('../controllers/WebUserController');
const {WebAuth }= require("../utils/authUserToken");
const router = express.Router();
const { upload } = require("../utils/multer")
router.post('/login/user/bookings', loginWebUser);
router.post('/register/user/bookings', registerWebUser);
router.get('/logout/user/bookings', WebAuth, logoutUser);
router.get('/web/user', WebAuth, getWebUser);
router.get("/all-users",WebAuth,allUsers)
router.get("/saloons", WebAuth, getAllSaloons)
router.post("/offer-images",WebAuth, upload.any("images"), addOfferImages)
router.get("/offer-images", WebAuth, allImages)
router.put("/change-password/:id",WebAuth,changeUserPassword)
router.delete("/delete-offer/:id",WebAuth,deleteImage)

module.exports = router;