const PlacesRepository = require("../repositories/places.repository");

class PlacesService {
  constructor() {
    this.placesRepository = new PlacesRepository();
  }

  getSplitCity = async (cityID, city, splitNumber) => {
    const replacesSplit = await this.placesRepository.getSplitCity(
      cityID,
      city,
      splitNumber
    );

    return replacesSplit;
  };

  Review = async (placeID) => {
    const Review = await this.placesRepository.Review(placeID);

    return Review;
  };

  buildingInfo = async (placeID) => {
    const findOneRooms = await this.placesRepository.buildingInfo(placeID);

    return findOneRooms;
  };

  getDetailInfo = async (userId, placeID) => {
    const DetailInfo = await this.placesRepository.getDetailInfo(
      userId,
      placeID
    );

    return DetailInfo;
  };
}

module.exports = PlacesService;
