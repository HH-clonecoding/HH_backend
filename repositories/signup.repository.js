const { Users } = require('../models')

class SignUpRepository {
  // 회원가입
  signUp = async (userId, nickname, password) => {
    const createSignUp = await Users.create({
      userId,
      nickname,
      password,
    })

    return createSignUp
  }
}
