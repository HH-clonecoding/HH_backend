const LoginService = require('../services/login.service')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class LoginController {
  LoginService = new LoginService()

  logIn = async (req, res, next) => {
    try {
      const { userId, password } = req.body

      await this.LoginService.logIn(userId, password)

      // nickname 불러오기
      const getNickName = await this.LoginService.getNickName(userId, password)

      // Access Token 생성
      const accessToken = jwt.sign({ userId: userId }, process.env.TOKEN_KEY, { expiresIn: '15m' })

      // Refresh Token 생성
      const refreshToken = jwt.sign({}, process.env.TOKEN_KEY, { expiresIn: '1d' })

      // Refresh Token DB에 업데이트
      await this.LoginService.updateToken(userId, refreshToken)

      res.set({ accessToken: `Bearer ${accessToken}`, refreshToken: `Bearer ${refreshToken}` })

      res.status(200).json({ nickname: getNickName.nickname })
    } catch (err) {
      res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' })
      next(err)
    }
  }
}

module.exports = LoginController
