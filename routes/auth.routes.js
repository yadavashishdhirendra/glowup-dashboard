const express = require('express');
const { getAllSaloons } = require("../controllers/saloonController");
const {
      registerWebUser,
      loginWebUser,
      logoutUser,
      getWebUser,
} = require('../controllers/WebUserController');
const {WebAuth }= require("../utils/authUserToken");
const router = express.Router();

router.post('/login/user/bookings', loginWebUser);
router.post('/register/user/bookings', registerWebUser);
router.get('/logout/user/bookings', WebAuth, logoutUser);
router.get('/web/user', WebAuth, getWebUser);
router.get("/saloons", WebAuth, getAllSaloons)


module.exports = router;