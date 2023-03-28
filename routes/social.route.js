const express = require('express')
const router = express.Router()

const SocialController = require('../controllers/social.controller')
const socialController = new SocialController()

router.post('/kakao/isKaKao', socialController.isKakao)
router.post('/kakao/callback', socialController.kakao_callback)

module.exports = router
