const router = require("express").Router()
const { registerCareUser, login, profile, logout } = require("../controllers/CustomerCareControllers")
const {
      getSpecificDateBooking,
} = require("../controllers/bookingController");
const { isCareUser } = require("../utils/authUserToken")
router.post("/customer-care/register", registerCareUser)
router.post("/customer-care/login", login)
router.get("/customer-care/profile", isCareUser, profile)
router.post("/customer-care/logout", isCareUser, logout)
router.post("/date/bookings",isCareUser, getSpecificDateBooking)
module.exports = router