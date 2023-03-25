const { Users } = require('../models')
const { Op } = require('sequelize')

class LoginRepository {
  // 유저 정보 조회 by 아이디와 닉네임을 위한 함수
  findUserAccount = async (userId, nickname) => {
    // findOne으로 userId, nickname으로 이루진 정보 확인
    const findUserAccountData = await Users.findOne({
      where: {
        [Op.or]: [{ userId }, { nickname }],
      },
    })

    return findUserAccountData
  }

  // 로그인
  logIn = async (userId) => {
    // findOne으로 userId가 있는지 확인
    const loginData = await Users.findOne({ where: { userId } })

    return loginData
  }

  // Refresh Token 업데이트 하는 함수
  updateToken = async (userId, refreshToken) => {
    const updateTokenData = await Users.update({ refreshToken: refreshToken }, { where: { userId: userId } })

    return updateTokenData
  }
}

module.exports = LoginRepository
