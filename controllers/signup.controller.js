const SignUpService = require('../services/signup.service')
const jwt = require('jsonwebtoken')
const Boom = require('boom')
const Joi = require('joi')
require('dotenv').config()

class SignUpController {
  SignUpService = new SignUpService()

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { userId, nickname, password, passwordCheck } = req.body

      const reqObj = Joi.object({
        userId: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,}$')).required().messages({
          'string.base': 'ID는 문자로만 이루어져야 합니다.',
          'string.empty': 'ID를 입력해주세요.',
          'string.pattern.base': '아이디의 형식이 일치하지 않습니다',
          'any.required': 'ID를 입력해주세요.',
        }),
        nickname: Joi.string().pattern(new RegExp('^[a-zA-Z가-힣0-9]{2,}$')).required().messages({
          'string.base': 'Nickname은 문자로만 이루어져야 합니다.',
          'string.empty': 'Nickname을 입력해주세요.',
          'string.pattern.base': '닉네임의 형식이 일치하지 않습니다',
          'any.required': 'Nickname을 입력해주세요.',
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required().messages({
          'string.base': 'PW는 문자로만 이루어져야 합니다.',
          'string.empty': 'PW를 입력해주세요.',
          'string.pattern.base': '패스워드 형식이 일치하지 않습니다.',
          'any.required': 'PW를 입력해주세요.',
        }),
        passwordCheck: Joi.valid(Joi.ref('password')).messages({
          'any.only': '패스워드가 일치하지 않습니다.', // ref 일치 실패 시 커스텀 메시지
        }),
      })

      const validate = reqObj.validate({ userId, nickname, password, passwordCheck })
      if (validate.error) {
        res.Boom.preconditionFailed(validate.error.messages)
      } else {
        console.log('Valid input!')
      }

      await this.SignUpService.signUp(userId, nickname, password)

      const checkUserId = await this.SignUpRepository.findUser(userId)
      if (checkUserId) {
        res.Boom.preconditionFailed('중복된 아이디가 존재합니다.')
      }

      res.Boom.create({ msg: '회원가입에 성공하였습니다.' })
    } catch (err) {
      res.Boom.badRequest({ errorMessage: err.msg })
    }
  }
}
