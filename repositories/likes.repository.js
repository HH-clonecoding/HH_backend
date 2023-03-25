const { Likes, Places } = require("../models");

class LikeRepository {
  findOnePlace = async (placeID) => {
    const findOnePlace = await Places.findOne({ where: { placeId: placeID } });

    return findOnePlace;
  };
  findPlaceUserCheck = async (userId, placeID) => {
    const findLikes = await Likes.findOne({
      where: { PlaceId: placeID, UserId: userId },
    });

    return findLikes;
  };

  addLike = async (placeID, userId) => {
    const addLike = await Likes.create({ PlaceId: placeID, UserId: userId });

    return await addLike.save();
  };

  deleteLike = async (placeID, userId) => {
    const deleteLike = await Likes.destroy({
      where: { PlaceId: placeID, UserId: userId },
    });

    return deleteLike;
  };
}

module.exports = LikeRepository;
