const express = require("express");
const { home, loginUser, signupUser } = require("../controller/authController");

const router = express.Router();

router.post('/', home)
router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router;