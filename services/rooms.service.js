const RoomsRepository = require("../repositories/rooms.repository");

class RoomsService {
  constructor() {
    this.roomsRepository = new RoomsRepository();
  }

  findRamdomRoomName = async () => {
    const Random = await this.roomsRepository.findRamdomRoomName();

    const findOneCount = Math.floor(Math.random() * Random.length);
    const RandomBox = [];

    for (let i = 0; i < Random.length; i++) {
      RandomBox.push(Random[i].roomName);
    }

    return RandomBox[findOneCount].trim();
  };

  findRoomsDetail = async (placeId) => {
    const findRoomsDetail = await this.roomsRepository.findRoomsDetail(placeId);

    const rename = await Promise.all(
      findRoomsDetail.map((ele, index) => {
        let selectRoomDetailArray = [];
        selectRoomDetailArray.push(findRoomsDetail[index].option);

        return {
          pictures: !ele.pictures
            ? ""
            : ele.pictures.replace(/\s/g, "").substring(0, 4) == "http"
            ? ele.pictures.replace(/\s/g, "").split(",")
            : [
                ele.pictures
                  .replace(/\s/g, "")
                  .split(",")
                  .slice(0, 2)
                  .trim()
                  .join(","),
              ],
          roomname: ele.roomName,
          option: selectRoomDetailArray,
          minPeople: Math.floor(Math.random() * ele.maxPeople) + 1,
          maxPeople: ele.maxPeople,
          smoking: ele.smoking ? true : false,
        };
      })
    );

    return rename;
  };
}

module.exports = RoomsService;
