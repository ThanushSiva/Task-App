const express = require("express");
const { home, loginUser, signupUser, logoutUser } = require("../controller/authController");
const { createTask, readTask, deleteTask, updateTask, updateTaskStatus } = require("../controller/taskController");
const { authorization } = require("../middleware/authorization");

const router = express.Router();

router.post('/', authorization, home)
router.post('/login', loginUser)
router.post('/logout', authorization, logoutUser)
router.post('/signup', signupUser)
router.post('/create', authorization, createTask)
router.post('/read', authorization, readTask)
router.post('/delete', authorization, deleteTask)
router.post('/replace', authorization, updateTask)
router.post('/update-task', authorization, updateTaskStatus)

module.exports = router;