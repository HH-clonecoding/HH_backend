const SignUpService = require("../services/signup.service");
const jwt = require("jsonwebtoken");
// const Boom = require('boom')
const CustomError = require("../middlewares/errorHandler");
const Joi = require("joi");
require("dotenv").config();

class SignUpController {
  SignUpService = new SignUpService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { userId, nickname, password, passwordCheck } = req.body;

      const reqObj = Joi.object({
        userId: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,}$/)
          .required()
          .messages({
            "string.base": "ID는 문자로만 이루어져야 합니다.",
            "string.empty": "ID를 입력해주세요.",
            "string.pattern.base": "아이디의 형식이 일치하지 않습니다",
            "any.required": "ID를 입력해주세요.",
          }),
        nickname: Joi.string()
          .regex(/^[a-zA-Z가-힣0-9]{2,}$/)
          .required()
          .messages({
            "string.base": "Nickname은 문자로만 이루어져야 합니다.",
            "string.empty": "Nickname을 입력해주세요.",
            "string.pattern.base": "닉네임의 형식이 일치하지 않습니다",
            "any.required": "Nickname을 입력해주세요.",
          }),
        password: Joi.string()
          .regex(/^[a-zA-Z0-9]{8,}$/)
          .required()
          .messages({
            "string.base": "PW는 문자로만 이루어져야 합니다.",
            "string.empty": "PW를 입력해주세요.",
            "string.pattern.base": "패스워드 형식이 일치하지 않습니다.",
            "any.required": "PW를 입력해주세요.",
          }),
        passwordCheck: Joi.valid(Joi.ref("password")).messages({
          "any.only": "패스워드가 일치하지 않습니다.", // ref 일치 실패 시 커스텀 메시지
        }),
      });

      const validate = reqObj.validate({
        userId,
        nickname,
        password,
        passwordCheck,
      });
      // console.log(validate)
      if (validate.error) {
        throw new CustomError(validate.error.message, 400, false);
      } else {
        console.log("Valid input!");
      }

      const Signup = await this.SignUpService.signUp(
        userId,
        nickname,
        password
      );

      if (Signup == null) {
        throw new CustomError("회원 생성에 실패했습니다.", 400, false);
      } else {
        return res.status(200).json({
          success: true,
          message: "회원가입에 성공했습니다.",
        });
      }
    } catch (err) {
      // res.status(400).json({ test: err.output.payload.message })
      next(err);
    }
  };
}
module.exports = SignUpController;

/////
