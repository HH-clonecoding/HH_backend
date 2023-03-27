const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware"); // router.get 추후 미들웨어 사용해야 한다 like 사용하기 위해서
const router = express.Router();

const RoomsController = require("../controllers/rooms.controller");
const roomsController = new RoomsController();

// router.get("/", RoomsController.(임시)) // 임시로 만들어진 라우터입니다. 삭제 가능합니다.

module.exports = router;
