const express = require('express')
const router = express.Router()

const LoginController = require('../controllers/login.controller')
const loginController = new LoginController()

// 로그인
router.post('/', loginController.logIn)

module.exports = router
