const router = require('express').Router()
const {
      totalAmount,
      getAllBookingsOfSaloon,
      allBookingsWeb,
      deleteBooking
} = require("../controllers/bookingController");
const { WebAuth } = require("../utils/authUserToken")
router.get('/allweb/user/bookings', WebAuth, allBookingsWeb);
router.get("/bookings/:id", WebAuth, getAllBookingsOfSaloon)
router.post("/account", WebAuth, totalAmount)
router.delete("/delete-booking/:id",WebAuth,deleteBooking)
module.exports = router