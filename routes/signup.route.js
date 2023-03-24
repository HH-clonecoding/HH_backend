const express = require('express')
const router = express.Router()

const SignUpController = require('../controllers/signup.controller')
const signUpController = new SignUpController()

// 회원가입
router.post('/signup', signUpController.signUpUser)

module.exports = router
