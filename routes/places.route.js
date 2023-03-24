const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware"); // router.get 추후 미들웨어 사용해야 한다 like 사용하기 위해서
const router = express.Router();

const PlacesController = require("../controllers/places.controller");
const placesController = new PlacesController();

router.post("/:cityID", placesController.mainPage); // 메인페이지 city 가져와야함

// router.get("/:placeID", placesController.);

module.exports = router;
