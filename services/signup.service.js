const SignUpRepository = require('../repositories/signup.repository')
const bcrypt = require('bcrypt')
require('dotenv').config()

class SignUpService {
  SignUpRepository = new SignUpRepository()

  // 회원가입
  signUp = async (userId, nickname, password) => {
    const hashedPw = bcrypt.hashSync(password, 10)

    const createSignUpData = await this.SignUpRepository.signUp(userId, nickname, hashedPw)

    return createSignUpData
  }
}

module.exports = SignUpService
