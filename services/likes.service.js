const LikeRepository = require("../repositories/likes.repository");

const Boom = require("boom");

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  findCheckAndAdd = async (userId, placeID, likeToggle) => {
    if (!likeToggle || likeToggle !== "true") {
      const isLike = await this.likeRepository.findPlaceUserCheck(
        userId,
        placeID
      );
      return isLike ? true : false;
    } else {
      const existsPlace = await this.likeRepository.findOnePlace(placeID);

      if (!existsPlace) {
        throw Boom.notFound("게시글이 존재하지 않습니다.");
      }

      try {
        const isLike = await this.likeRepository.findPlaceUserCheck(
          userId,
          placeID
        );

        if (!isLike) {
          const addLike = this.likeRepository.addLike(placeID, userId);
          const message = "게시글의 좋아요를 등록하였습니다.";
          addLike;

          return true;
        } else {
          const deleteLike = this.likeRepository.deleteLike(placeID, userId);
          const message = "게시글의 좋아요를 취소하였습니다.";
          deleteLike;

          return false;
        }
      } catch (error) {
        throw Boom.badRequest("게시글 좋아요에 실패하였습니다.");
      }
    }
  };

  toggleLike = async (userId, placeID) => {
    const existsPlace = await this.likeRepository.findOnePlace(placeID);

    if (!existsPlace) {
      throw Boom.notFound("게시글이 존재하지 않습니다.");
    }

    try {
      const isLike = await this.likeRepository.findPlaceUserCheck(
        userId,
        placeID
      );

      if (!isLike) {
        const addLike = this.likeRepository.addLike(placeID, userId);
        const message = "게시글의 좋아요를 등록하였습니다.";
        addLike;
        return true;
      } else {
        const deleteLike = this.likeRepository.deleteLike(placeID, userId);
        const message = "게시글의 좋아요를 취소하였습니다.";
        deleteLike;
        return false;
      }
    } catch (error) {
      throw Boom.badRequest("게시글 좋아요에 실패하였습니다.");
    }
  };
}

module.exports = LikeService;
