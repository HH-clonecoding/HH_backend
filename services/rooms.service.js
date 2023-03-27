const RoomsRepository = require("../repositories/rooms.repository");

class RoomsService {
  constructor() {
    this.roomsRepository = new RoomsRepository();
  }

  findRoomsDetail = async (placeId) => {
    const findRoomsDetail = this.roomsRepository.findRoomsDetail(placeId);

    return findRoomsDetail;
  };
}

module.exports = RoomsService;
