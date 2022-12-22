const express = require("express");
const { home, loginUser, signupUser } = require("../controller/authController");
const { createTask, readTask, deleteTask } = require("../controller/taskController");

const router = express.Router();

router.post('/', home)
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/create', createTask)
router.post('/read', readTask)
router.post('/delete', deleteTask)

module.exports = router;