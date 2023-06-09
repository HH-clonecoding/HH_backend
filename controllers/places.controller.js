const PlacesService = require("../services/places.service");
const RoomsService = require("../services/rooms.service");
const CustomError = require("../middlewares/errorHandler");
const Joi = require("joi");

class PlacesController {
  constructor() {
    this.placesService = new PlacesService();
    this.roomsService = new RoomsService();
  }

  mainPage = async (req, res, next) => {
    const { city, splitNumber, splitPageNumber } = req.query;

    const messages = {
      "string.base": "이 필드는 문자열로 이루어져야 합니다.",
      "string.empty": "이 필드는 비어 있을 수 없습니다.",
      "any.required": "이 필드는 필수입니다.",
    };

    const schema = Joi.object({
      splitPageNumber: Joi.string().messages({
        ...messages,
        "string.base": "cityID 필드는 숫자로 이루어져야 합니다.",
      }),
      city: Joi.string().messages({
        ...messages,
        "string.base": "city 필드는 문자열로 이루어져야 합니다.",
      }),
      splitNumber: Joi.string().messages({
        ...messages,
        "string.base": "splitNumber 필드는 숫자로 이루어져야 합니다.",
      }),
    });

    const validate = schema.validate(
      {
        splitPageNumber: splitPageNumber,
        city: city,
        splitNumber: splitNumber,
      },
      { abortEarly: false }
    );

    if (validate.error) {
      throw new CustomError(validate.error.message, 400, false);
    } else {
      console.log("Valid input!");
    }

    try {
      if (!city) {
        throw new CustomError(
          { errorMessage: "city 데이터 형식이 올바르지 않습니다. 빈 값입니다" },
          412,
          false
        );
      } else if (!splitNumber) {
        throw new CustomError(
          { errorMessage: "body 데이터 형식이 올바르지 않습니다. 빈 값입니다" },
          412,
          false
        );
      }

      const city_list = await this.placesService.getSplitCity(
        splitPageNumber,
        city,
        Number(splitNumber)
      );

      return res.status(200).json({ motelList: city_list });
      // artist_list == false ? res.status(sc.BAD_REQUEST).send(au.successFalse(rm.DB_NOT_MATCHED_ERROR)) : res.status(sc.OK).send(au.successTrue(rm.DB_SUCCESS, artist_list));
    } catch (err) {
      throw new CustomError(
        { errorMessage: "예상하지 못한 에러가 발생했습니다." },
        500,
        false
      );
    }
  };

  Review = async (req, res, next) => {
    const likeToggle = req.query.likeToggle; // 추후 좋아요 쿼리 등록
    const { placeID } = req.params;

    const messages = {
      "string.base": "이 필드는 숫자로 이루어져야 합니다.",
      "string.empty": "이 필드는 비어 있을 수 없습니다.",
      "any.required": "이 필드는 필수입니다.",
    };

    const schema = Joi.object({
      placeID: Joi.number().messages({
        ...messages,
        "string.base": "placeID 필드는 숫자로 이루어져야 합니다.",
      }),
    });

    const validate = schema.validate(
      { placeID: placeID },
      { abortEarly: false }
    );

    if (validate.error) {
      throw new CustomError(validate.error.message, 400, false);
    } else {
      console.log("Valid input!");
    }

    try {
      const buildingInfo = await this.placesService.buildingInfo(placeID);
      if (!buildingInfo) {
        throw new CustomError(
          { errorMessage: "buildingInfo 데이터에 값이 존재하지 않습니다." },
          404,
          false
        );
      }

      // 프론트에서 어떻게 보내냐에 따라서 if문의 조건이 달라져야함
      if (res.locals.user) {
        const { userId } = res.locals.user; // 프론트에서 어떻게 보내냐에 따라서 달라져야함
        const getUserDetailInfo = await this.placesService.getDetailInfo(
          userId,
          placeID,
          likeToggle
        );

        if (!getUserDetailInfo) {
          throw new CustomError(
            {
              errorMessage:
                "getUserDetailInfo 데이터에 값이 존재하지 않습니다.",
            },
            404,
            false
          );
        }

        const {
          placeId,
          picture,
          name,
          star,
          commentCount,
          like,
          system,
          location,
        } = getUserDetailInfo;

        return res.status(200).json({
          placeId: placeId,
          picture: picture,
          name: name,
          star: star,
          commentCount: commentCount,
          like: like,
          system: system,
          location: location,
          totalRoom: buildingInfo,
        });
      } else {
        const getDetailInfo = await this.placesService.getNoAuthDetailInfo(
          placeID
        );

        if (!getDetailInfo) {
          throw new CustomError(
            {
              errorMessage: "getDetailInfo 데이터에 값이 존재하지 않습니다.",
            },
            404,
            false
          );
        }

        const [
          {
            placeId,
            picture,
            name,
            star,
            commentCount,
            like,
            system,
            location,
          },
        ] = getDetailInfo;

        return res.status(200).json({
          placeId: placeId,
          picture: picture,
          name: name,
          star: star,
          commentCount: commentCount,
          like: like,
          system: system,
          location: location,
          totalRoom: buildingInfo,
        });
      }
    } catch (error) {
      throw new CustomError(
        { errorMessage: "예상하지 못한 에러가 발생했습니다." },
        500,
        false
      );
    }
  };

  placeRoomDetail = async (req, res, next) => {
    const boolValue = req.query.boolValue; // 추후 좋아요 쿼리 등록
    const { placeID } = req.params;
    const findRoomsDetail = await this.roomsService.findRoomsDetail(placeID);

    const messages = {
      "string.base": "이 필드는 숫자로 이루어져야 합니다.",
      "string.empty": "이 필드는 비어 있을 수 없습니다.",
      "any.required": "이 필드는 필수입니다.",
    };

    const schema = Joi.object({
      placeID: Joi.number().messages({
        ...messages,
        "string.base": "placeID 필드는 숫자로 이루어져야 합니다.",
      }),
    });

    const validate = schema.validate(
      { placeID: placeID },
      { abortEarly: false }
    );

    if (validate.error) {
      throw new CustomError(validate.error.message, 400, false);
    } else {
      console.log("Valid input!");
    }

    try {
      return res.status(200).json({ roomdetail: findRoomsDetail });
    } catch (error) {
      throw new CustomError(
        { errorMessage: "예상하지 못한 에러가 발생했습니다." },
        500,
        false
      );
    }
  };

  placeComments = async (req, res, next) => {
    const boolValue = req.query.boolValue;
    const { placeID } = req.params;

    const messages = {
      "string.base": "이 필드는 숫자로 이루어져야 합니다.",
      "string.empty": "이 필드는 비어 있을 수 없습니다.",
      "any.required": "이 필드는 필수입니다.",
    };

    const schema = Joi.object({
      placeID: Joi.number().messages({
        ...messages,
        "string.base": "placeID 필드는 숫자로 이루어져야 합니다.",
      }),
    });

    const validate = schema.validate(
      { placeID: placeID },
      { abortEarly: false }
    );

    if (validate.error) {
      throw new CustomError(validate.error.message, 400, false);
    } else {
      console.log("Valid input!");
    }

    try {
      const Review = await this.placesService.Review(placeID);
      if (!Review) {
        throw new CustomError(
          { errorMessage: "Review 데이터에 값이 존재하지 않습니다." },
          404,
          false
        );
      }

      return res.status(200).json({ comments: Review });
    } catch (error) {
      throw new CustomError(
        { errorMessage: "예상하지 못한 에러가 발생했습니다." },
        500,
        false
      );
    }
  };

  placeLocation = async (req, res, next) => {
    const { placeID } = req.params;

    const messages = {
      "string.base": "이 필드는 숫자로 이루어져야 합니다.",
      "string.empty": "이 필드는 비어 있을 수 없습니다.",
      "any.required": "이 필드는 필수입니다.",
    };

    const schema = Joi.object({
      placeID: Joi.number().messages({
        ...messages,
        "string.base": "placeID 필드는 숫자로 이루어져야 합니다.",
      }),
    });

    const validate = schema.validate(
      { placeID: placeID },
      { abortEarly: false }
    );

    if (validate.error) {
      throw new CustomError(validate.error.message, 400, false);
    } else {
      console.log("Valid input!");
    }

    try {
      const getDetailInfo = await this.placesService.getNoAuthDetailInfo(
        placeID
      );

      if (!getDetailInfo) {
        throw new CustomError(
          {
            errorMessage: "getDetailInfo 데이터에 값이 존재하지 않습니다.",
          },
          404,
          false
        );
      }

      const [{ location }] = getDetailInfo;

      return res.status(200).json({ location: location.address });
    } catch (error) {
      throw new CustomError(
        { errorMessage: "예상하지 못한 에러가 발생했습니다." },
        500,
        false
      );
    }
  };
}

module.exports = PlacesController;
