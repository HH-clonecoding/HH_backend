const { Places, Comments, Re_comments } = require("../models");
const LikeService = require("../services/likes.service");
const sequelize = require("sequelize");

class PlacesRepository {
  constructor() {
    this.likeService = new LikeService();
  }

  getSplitCity = async (cityID, city, splitNumber) => {
    const total = await Places.count({ where: { city } });

    // 게시글 가져오기
    const placesSplit = await Places.findAll({
      where: { city }, // 도시 조건 의문 해결 cityID를 지역 쿼리로 생각하자
      order: [["createdAt", "DESC"]], // createdAt 역순으로 정렬
      offset: splitNumber * (cityID - 1), // * (page - 1) 페이지당 게시글 수만큼 건너뛰기
      limit: splitNumber, // 페이지당 게시글 수만큼 가져오기
      attributes: [
        [sequelize.literal('IFNULL("picture", "")'), "picture"],
        "name",
        "star",
        "placeId",
      ],
    });

    const replacesSplit = await Promise.all(
      placesSplit.map(async (ele) => {
        const findPlacename = await Comments.findAll({
          where: { PlaceId: ele.placeId },
        });
        return {
          picture: ele.picture || "",
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
      findComments.map(async (ele) => {
        const findRecomment = await Re_comments.findAll({
          where: { CommentId: ele.commentId },
        });
        return {
          commentId: ele.commentId,
          nickname: ele.nickname,
          rate: ele.rate,
          createDate: ele.createdAt,
          comment: ele.comment,
          pictures: ele.pictures, // 배열로 들어가면 배열로 나오겠지?
          reply: {
            comment: findRecomment.comment || "",
            createDate: findRecomment.createdAt || "",
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
          like: userId
            ? await this.likeService.findCheckAndAdd(userId, placeID, boolValue)
            : false, //라이크 들어가야함
          system: ele.system,
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
