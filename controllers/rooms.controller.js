const RoomsService = require("../services/rooms.service");

class RoomsController {
  constructor() {
    this.roomsService = new RoomsService();
  }
}

module.exports = RoomsController;
