const PlacesService = require("../services/places.service");

class PlacesController {
  constructor() {
    this.placesService = new PlacesService();
  }

  mainPage = async (req, res, next) => {
    const { cityID } = req.params;
    const { city, splitNumber } = req.body;

    try {
      if (!city) {
        res
          .status(412)
          .json({ errorMessage: "city 데이터 형식이 올바르지 않습니다." });
      } else if (!splitNumber) {
        res
          .status(412)
          .json({ errorMessage: "body 데이터 형식이 올바르지 않습니다." });
      }
      const city_list = await this.placesService.getSplitCity(
        cityID,
        city,
        Number(splitNumber)
      );
      city_list;
      return res.status(200).json({ motelList: city_list });
      // artist_list == false ? res.status(sc.BAD_REQUEST).send(au.successFalse(rm.DB_NOT_MATCHED_ERROR)) : res.status(sc.OK).send(au.successTrue(rm.DB_SUCCESS, artist_list));
    } catch (err) {
      res.status(400).send("오류");
      throw err;
    }
  };

  Review = async (req, res, next) => {
    const { placeID } = req.params;
    const { userId } = res.locals.user;

    const Review = await this.placesService.Review(placeID);

    const buildingInfo = await this.placesService.buildingInfo(placeID);

    const getDetailInfo = await this.placesService.getDetailInfo(
      userId,
      placeID
    );

    const { picture, name, star, commentCount, like, system, location } =
      getDetailInfo;

    return res.status(200).json({
      picture: picture,
      name: name,
      star: star,
      commentCount: commentCount,
      like: like,
      system: system,
      location: location,
      totalRoom: buildingInfo,
      comments: Review,
    });
  };
}

module.exports = PlacesController;
