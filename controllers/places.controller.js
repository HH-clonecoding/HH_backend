const PlacesService = require("../services/places.service");

class PlacesController {
  constructor() {
    this.placesService = new PlacesService();
  }

  mainPage = async (req, res, next) => {
    const { cityID } = req.params;

    await this.placesService.getCity(cityID);
  };
}

module.exports = PlacesController;
