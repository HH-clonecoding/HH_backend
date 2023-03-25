const LoginRepository = require('../repositories/login.repository')
const CustomError = require('../middlewares/errorHandler')
const bcrypt = require('bcrypt')

class LoginService {
  LoginRepository = new LoginRepository()

  logIn = async (userId, password) => {
    const loginData = await this.LoginRepository.logIn(userId)

    const match = bcrypt.compareSync(password, loginData.password)

    if (!loginData.userId || !match) {
      throw new CustomError('아이디 또는 패스워드를 확인해주세요.', 400, false)
    }

    return loginData
  }

  // Refresh Token 업데이트 하는 함수
  updateToken = async (userId, refreshToken) => {
    await this.LoginRepository.updateToken(userId, refreshToken)

    const findData = await this.LoginRepository.findUserAccount(userId, refreshToken)

    return findData
  }

  // nickname 불러오기
  getNickName = async (userId, password) => {
    const getNickName = await this.LoginRepository.findUserAccount(userId, password)

    return getNickName
  }
}

module.exports = LoginService
