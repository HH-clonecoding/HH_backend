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
}

module.exports = PlacesService;
