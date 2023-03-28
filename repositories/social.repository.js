const { Users } = require('../models')

class SocialRepository {
  // userId, nickname 생성
  createUser = async (userId, nickname) => {
    const createUser = await Users.create(userId, nickname)
    return createUser
  }

  // nickname 찾기
  findUserAccountNick = async (nickname) => {
    const findUserAccountData = await Users.findOne({ where: { nickname } })
    return findUserAccountData
  }

  // userId 찾기
  findUser = async (userId) => {
    const findUser = await Users.findOne({ where: { userId } })
    return findUser
  }

  // refreshToken update
  updateRefresh = async (userId, refreshToken) => {
    const updateRefresh = await Users.update({ userId: userId }, { where: { refreshToken: refreshToken } })
    return updateRefresh
  }
}

module.exports = SocialRepository
