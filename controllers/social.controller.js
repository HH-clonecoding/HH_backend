const SocialService = require('../services/social.service')
require('dotenv').config()

class SocialController {
  socialService = new SocialService()

  isKakao = async (req, res, next) => {
    try {
      // 프론에게 인가코드 받기
      const { code } = req.query

      // console.log('인가 코드' + code)
      try {
        const isKakao = await this.socialService.isKakao(code)

        const findKakaoUser = await this.socialService.findUser(isKakao)
        if (!findKakaoUser) {
          res.status(200).json({ userId: isKakao })
        } else {
          const accessToken = await this.socialService.accessToken(isKakao)
          const refreshToken = await this.socialService.refreshToken()

          // refreshtoken DB에 업데이트
          await this.socialService.updateRefresh(isKakao, refreshToken)

          res.status(201).json({
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
          })
        }
      } catch (error) {
        console.log(error)
        res.send(error)
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        errorMessage: err.message,
        message: '에러가 발생했습니다.',
      })
    }
  }

  kakao_callback = async (req, res, next) => {
    try {
      // 프론트에게 인가코드 받기
      const { userId, nickname } = req.body

      // 회원가입에 필요한 내용 싹다 넣기 -> kakao에 있는 model를 users로 변경
      // console.log(nickName)
      // console.log(address)
      try {
        await this.socialService.createUser(userId, nickname)

        const accessToken = await this.socialService.accessToken(userId)
        const refreshToken = await this.socialService.refreshToken()

        await this.socialService.updateRefresh(userId, refreshToken)

        res.status(201).json({
          accessToken: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`,
        })
      } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message, statusCode: error.status })
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        errorMessage: err.message,
        message: '에러가 발생했습니다.',
      })
    }
  }
}
module.exports = SocialController
