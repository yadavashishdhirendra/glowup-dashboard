const express = require('express');
const { getAllSaloons,
      getSingleSaloon,
      updateSaloonTags,
      addImages,
      deleteImage,
      changeImagesPosition,
      createUserAccount,
      createNewSaloon,
      deleteSaloon,
      addOffersField,
      updateSalon
} = require("../controllers/saloonController");
const { WebAuth } = require("../utils/authUserToken");
const { upload } = require("../utils/multer")
const router = express.Router();
router.get("/saloons", getAllSaloons)
router.get("/saloon/:id", WebAuth, getSingleSaloon)
router.post("/new-user", WebAuth, createUserAccount)
router.post("/new-salon", WebAuth, createNewSaloon)
router.put("/tags-saloon", WebAuth, updateSaloonTags)
router.post("/new-images/:id", upload.any("file"), addImages)
router.put("/delete-images", WebAuth, deleteImage)
router.delete("/saloon/:id", WebAuth, deleteSaloon)
router.put("/update/saloon/:id", WebAuth, updateSalon)
router.put("/change-image-position/saloon/:id", WebAuth, changeImagesPosition)
module.exports = router
