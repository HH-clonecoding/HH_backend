const { Rooms } = require("../models");

class RoomsRepository {
  findRoomsDetail = async (placeId) => {
    const findRoomsDetail = await Rooms.findAll({
      where: { PlaceId: placeId },
      attributes: ["pictures", "roomname", "option"],
    });

    return findRoomsDetail;
  };
}

module.exports = RoomsRepository;
