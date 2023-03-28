const { Rooms } = require("../models");

class RoomsRepository {
  findRamdomRoomName = async () => {
    const RandomName = await Rooms.findAll({});

    return RandomName;
  };

  findRoomsDetail = async (placeId) => {
    const findRoomsDetail = await Rooms.findAll({
      where: { PlaceId: placeId },
      attributes: ["pictures", "roomName", "option", "maxPeople", "smoking"],
    });

    return findRoomsDetail;
  };
}

module.exports = RoomsRepository;
