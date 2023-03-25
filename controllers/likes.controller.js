const LikeService = require("../services/likes.service");

class LikeController {
  constructor() {
    this.likeService = new LikeService();
  }
}

module.exports = LikeController;
