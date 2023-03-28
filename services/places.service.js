const PlacesRepository = require("../repositories/places.repository");

class PlacesService {
  constructor() {
    this.placesRepository = new PlacesRepository();
  }

  getSplitCity = async (splitPageNumber, city, splitNumber) => {
    const replacesSplit = await this.placesRepository.getSplitCity(
      splitPageNumber,
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

  getNoAuthDetailInfo = async (placeID) => {
    const DetailInfo = await this.placesRepository.getNoAuthDetailInfo(placeID);

    return DetailInfo;
  };

  getDetailInfo = async (userId, placeID, likeToggle) => {
    const DetailInfo = await this.placesRepository.getDetailInfo(
      userId,
      placeID,
      likeToggle
    );

    return DetailInfo;
  };
}

module.exports = PlacesService;
