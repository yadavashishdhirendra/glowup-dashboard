const router = require("express").Router()
const { registerCareUser, login, profile, logout } = require("../controllers/CustomerCareControllers")
const {
      getSpecificDateBooking,
} = require("../controllers/bookingController");
const { isCareUser } = require("../utils/authUserToken")
router.post("/register", registerCareUser)
router.post("/login", login)
router.get("/profile", isCareUser, profile)
router.post("/logout", isCareUser, logout)
router.post("/date/bookings",isCareUser, getSpecificDateBooking)
module.exports = router