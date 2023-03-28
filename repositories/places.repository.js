const { Places, Comments, Re_comments } = require("../models");
const LikeService = require("../services/likes.service");
const RoomsService = require("../services/rooms.service");
const sequelize = require("sequelize");

class PlacesRepository {
  constructor() {
    this.likeService = new LikeService();
    this.roomsService = new RoomsService();
  }

  getSplitCity = async (splitPageNumber, city, splitNumber) => {
    const total = await Places.count({ where: { city } });

    // 게시글 가져오기
    const placesSplit = await Places.findAll({
      where: { city }, // 도시 조건 의문 해결 cityID를 지역 쿼리로 생각하자
      order: [["createdAt", "DESC"]], // createdAt 역순으로 정렬
      offset: splitNumber * (splitPageNumber - 1), // * (page - 1) 페이지당 게시글 수만큼 건너뛰기
      limit: splitNumber, // 페이지당 게시글 수만큼 가져오기
      attributes: ["pictures", "name", "star", "placeId"],
    });

    const replacesSplit = await Promise.all(
      placesSplit.map(async (ele) => {
        const findPlacename = await Comments.findAll({
          where: { PlaceId: ele.placeId },
        });
        console.log(findPlacename);
        return {
          picture: ele.pictures || "",
          name: ele.name || "",
          star: ele.star || "",
          commentCount: findPlacename.length || 0,
        };
      })
    );

    const totalPlaces = Math.ceil(total / splitNumber);

    return await replacesSplit;
  };

  Review = async (placeID) => {
    const findComments = await Comments.findAll({
      where: { PlaceId: placeID },
      order: [["createdAt", "DESC"]], // createdAt 역순으로 정렬
    });

    const renameFineComments = await Promise.all(
      findComments.map(async (ele, index) => {
        const findRecomment = await Re_comments.findAll({
          where: { CommentId: ele.commentId },
        });
        const findRecomments = findRecomment[index] || "";

        return {
          commentId: ele.commentId,
          nickname: ele.nickname,
          stayedroom: await this.roomsService.findRamdomRoomName(),
          rate: ele.rate,
          createDate: ele.createdAt,
          comment: ele.comment,
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
          reply: {
            comment: findRecomments.comment || "",
            createDate: findRecomments.createdAt || "",
          },
        };
      })
    );

    return renameFineComments;
  };

  buildingInfo = async (placeID) => {
    const findOne = await Places.findOne({ where: { placeId: placeID } });
    const findOneRooms = findOne.totalRoom;
    return findOneRooms;
  };

  getNoAuthDetailInfo = async (placeID) => {
    // 게시글 가져오기
    const getDetailInfo = await Places.findAll({
      where: { placeId: placeID }, // 도시 조건 의문 해결 cityID를 지역 쿼리로 생각하자
      order: [["createdAt", "DESC"]], // createdAt 역순으로 정렬
      attributes: [
        "pictures",
        "name",
        "star",
        "placeId",
        "system",
        "city",
        "address",
      ],
    });

    const reNameInfo = await Promise.all(
      getDetailInfo.map(async (ele, index) => {
        const findPlacename = await Comments.findAll({
          where: { PlaceId: ele.placeId },
        });

        let initialValue = 0;
        for (let i = 0; i < findPlacename.length; i++) {
          initialValue += findPlacename[i].rate;
        }

        const starAvg = initialValue / findPlacename.length;
        const roundedAvg = Math.round(starAvg * 10) / 10;

        return {
          picture: !ele.pictures
            ? ""
            : ele.pictures.replace(/\s/g, "").substring(0, 4) == "http"
            ? ele.pictures.replace(/\s/g, "").split(",")
            : [
                ele.pictures
                  .replace(/\s/g, "")
                  .split(",")
                  .slice(0, 2)
                  .join(","),
              ],
          name: ele.name || "",
          star: roundedAvg || 0,
          commentCount: findPlacename.length || 0,
          like: false,
          system: !ele.system ? "" : ele.system.replace(/\s/g, "").split(","),
          location: {
            city: ele.city || "",
            address: ele.address || "",
          },
        };
      })
    );

    return reNameInfo;
  };

  getDetailInfo = async (userId, placeID, boolValue) => {
    // 게시글 가져오기

    const getDetailInfo = await Places.findAll({
      where: { placeId: placeID }, // 도시 조건 의문 해결 cityID를 지역 쿼리로 생각하자
      order: [["createdAt", "DESC"]], // createdAt 역순으로 정렬
      attributes: [
        [sequelize.literal('IFNULL("picture", "")'), "picture"],
        "name",
        "star",
        "placeId",
        "system",
        "city",
        "address",
      ],
    });

    const reNameInfo = await Promise.all(
      getDetailInfo.map(async (ele) => {
        const findPlacename = await Comments.findAll({
          where: { PlaceId: ele.placeId },
        });
        return {
          picture: ele.picture,
          name: ele.name,
          star: ele.star,
          commentCount: findPlacename.length || 0,
          like: await this.likeService.findCheckAndAdd(
            userId,
            placeID,
            boolValue
          ),
          system: ele.system.replace(/\s/g, ""),
          location: {
            city: ele.city,
            address: ele.address,
          },
        };
      })
    );

    return reNameInfo;
  };
}

module.exports = PlacesRepository;
