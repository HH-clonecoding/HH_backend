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
        city,
        splitNumber
      );
      city_list;
      return res.status(200).json({ motelList: city_list });
      // artist_list == false ? res.status(sc.BAD_REQUEST).send(au.successFalse(rm.DB_NOT_MATCHED_ERROR)) : res.status(sc.OK).send(au.successTrue(rm.DB_SUCCESS, artist_list));
    } catch (err) {
      res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(au.successFalse(rm.INTERNAL_SERVER_ERROR));
      throw err;
    }

    return;
  };
}

module.exports = PlacesController;
