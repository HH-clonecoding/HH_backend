const express = require("express");
const router = express.Router();

const loginRouter = require("./login.route");
const placesRouter = require("./places.route");
const signupRouter = require("./signup.route");
const likesRouter = require("./likes.route");
const roomsRouter = require("./rooms.route");
// const socialRouter = require('./social.route')
// const re_commentsRouter = require("./re_comments.route"); // 추후에 기능 구현 할 수도 있음
// const commentsRouter = require("./comments.route"); // 추후에 기능 구현 할 수도 있음
// router.use('/social', socialRouter)
router.use("/user/signup", signupRouter);
router.use("/user/login", loginRouter);
router.use("/place", placesRouter);
// router.use("/like", likesRouter);

module.exports = router;
