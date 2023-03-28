const express = require('express')
const router = express.Router()
const passport = require('passport')

// passport-kakao Login [GET] /api/social/kakao/isKaKao
router.get('/kakao/isKaKao', passport.authenticate('kakao'))
// passport-kakao callback
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
  }),
  (req, res) => {
    res.redirect('/') // 성공시에는 /로 이동
  }
)

module.exports = router
