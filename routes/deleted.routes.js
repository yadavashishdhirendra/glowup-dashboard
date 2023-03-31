const router = require('express').Router()
const { deleteBookings } = require("../controllers/deletedSaloonController");
const { WebAuth } = require("../utils/authUserToken")
router.get('/deleted-bookings', WebAuth, deleteBookings);

module.exports = router