const axios = require('axios')
const jwt = require('jsonwebtoken')
const SocialRepository = require('../repositories/social.repository')
const CustomError = require('../middlewares/errorHandler')
const { text } = require('express')
require('dotenv').config()

const KAKAO_GRANT_TYPE = 'authorization_code'
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET
const KAKAO_REDIRECT_URL = process.env.KAKAO_REDIRECT_URL

class SocialService {
  socialRepository = new SocialRepository()

  // grant_type = 'authorization_code'으로 고정
  // client_id = 앱 REST API 키
  // redirect_uri = 인가 코드가 리다이렉트된 URI
  // code = 인가 코드 받기 요청으로 얻은 인가 코드
  isKakao = async (code) => {
    const { data } = await axios.post(
      // `https://kauth.kakao.com/oauth/token?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`,
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: KAKAO_GRANT_TYPE,
        client_id: KAKAO_CLIENT_ID,
        client_secret: KAKAO_CLIENT_SECRET,
        redirect_uri: KAKAO_REDIRECT_URL,
        code,
      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    )

    console.log(data)

    let access_Token = data.accessToken

    // token 을 카카오 쪽에 보내서 정보 요청 및 받기
    const kakaoUser = await axios('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_Token}`,
      },
    })
    return kakaoUser.data.id
  }

  createUser = async (userId, nickname) => {
    const isSameNickname = await this.socialRepository.findUserAccountNick(nickname)

    // 유저 nickname 중복 검사
    if (isSameNickname) {
      throw new CustomError('이미 가입된 닉네임이 존재합니다.', 400, false)
    }

    const createUser = await this.socialRepository.createUser(userId, nickname)
    return createUser
  }

  findUser = async (userId) => {
    const findUser = await this.socialRepository.findUser(userId)
    return findUser
  }

  updateRefresh = async (userId, refreshToken) => {
    const updateRefresh = await this.socialRepository.updateRefresh(userId, refreshToken)
    return updateRefresh
  }

  accessToken = async (userId) => {
    const accessToken = jwt.sign({ userId, userId }, process.env.TOKEN_SECRET, {
      expiresIn: '30m',
    })
    return accessToken
  }

  refreshToken = async () => {
    const refreshToken = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: '7d' })
    return refreshToken
  }
}

module.exports = SocialService
