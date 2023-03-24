const PlacesRepository = require("../repositories/places.repository");

class PlacesService {
  constructor() {
    this.placesRepository = new PlacesRepository();
  }

  getSplitCity = async (city, splitNumber) => {
    await this.placesRepository.getSplitCity(city, splitNumber);

    return;
  };
}

module.exports = PlacesService;
