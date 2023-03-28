const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware"); // router.get 추후 미들웨어 사용해야 한다 like 사용하기 위해서
const allusersMiddleware = require("../middlewares/allusersMiddleware");
const router = express.Router();

const PlacesController = require("../controllers/places.controller");
const placesController = new PlacesController();

/**
 * @swagger
 * paths:
 *  /api/place/:
 *   get:
 *    tags:
 *    - /place
 *    description: 모텔 정보 조회
 *    parameters:
 *    - in: query
 *      name: city
 *      description: city 도시 이름입니다. 03/26 mock데이터 = 인천 10개 ,서울 6개
 *      required: true
 *      schema:
 *        type: string
 *    - in: query
 *      name: splitNumber
 *      description: splitNumber = 자르고 싶은 숫자입니다.
 *      required: true
 *      schema:
 *        type: string
 *    - in: query
 *      name: splitPageNumber
 *      description:  splitPageNumber = 자른 데이터의 페이지입니다.
 *      required: true
 *      schema:
 *        type: string
 *
 *    responses:
 *     200:
 *      description: 모텔 정보 조회 성공
 *      schema:
 *        type: object
 *        properties:
 *          motelList:
 *            type: array
 *            description: 검색된 모텔 목록
 *            items:
 *              type: object
 *              properties:
 *                picture:
 *                  type: string
 *                  description: 모텔 이미지 URL
 *                name:
 *                  type: string
 *                  description: 모텔 이름
 *                star:
 *                  type: integer
 *                  description: 모텔 등급 (1~5)
 *                commentCount:
 *                  type: integer
 *                  description: 모텔 리뷰 개수
 *          nextPage:
 *            type: integer
 *            description: 다음 페이지 번호 (검색 결과가 한 페이지를 초과하는 경우)
 *     401:
 *      description: 모텔 정보 조회 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */

router.get("/", placesController.mainPage); // main 페이지

/**
 * @swagger
 * paths:
 *  /api/place/{placeID}:
 *    get:
 *      tags:
 *        - /place
 *      description: 모텔 정보 상세 조회
 *      parameters:
 *        - in: path
 *          name: placeID
 *          description: 상세 조회할 placeID입력
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: 모텔 정보 조회 성공
 *          schema:
 *            type: object
 *            properties:
 *              motelList:
 *                type: array
 *                description: 검색된 모텔 목록
 *                items:
 *                  type: object
 *                  properties:
 *                    picture:
 *                      type: string
 *                      description: 모텔 이미지 URL
 *                    name:
 *                      type: string
 *                      description: 모텔 이름
 *                    star:
 *                      type: integer
 *                      description: 모텔 등급 (1~5)
 *                    commentCount:
 *                      type: integer
 *                      description: 모텔 리뷰 개수
 *                    location:
 *                      type: object
 *                      properties:
 *                        city:
 *                          type: string
 *                          description: 도시 이름
 *                        address:
 *                          type: string
 *                          description: 모텔 주소
 *                    comments:
 *                      type: array
 *                      description: 모텔 리뷰 목록
 *                      items:
 *                        type: object
 *                        properties:
 *                          commentId:
 *                            type: integer
 *                            description: 리뷰 ID
 *                          nickname:
 *                            type: string
 *                            description: 리뷰어 닉네임
 *                          rate:
 *                            type: integer
 *                            description: 리뷰어가 매긴 별점 (1~5)
 *                          createDate:
 *                            type: string
 *                            format: date-time
 *                            description: 리뷰 작성일
 *                          comment:
 *                            type: string
 *                            description: 리뷰 내용
 *                          pictures:
 *                            type: array
 *                            description: 리뷰에 첨부된 사진 목록
 *                            items:
 *                              type: string
 *                              description: 사진 URL
 *                          reply:
 *                            type: object
 *                            properties:
 *                              comment:
 *                                type: string
 *                                description: 리뷰 답변 내용
 *                              createDate:
 *                                type: string
 *                                format: date-time
 *                                description: 리뷰 답변 작성일
 *        401:
 *          description: 모텔 정보 조회 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */

router.get("/:placeID", allusersMiddleware, placesController.Review); // place 상세보기

router.get("/rooms/:placeID", placesController.placeRoomDetail); // place 객실선택

router.get("/location/:placeID", placesController.placeLocation); // place 위치/정보

router.get("/rooms/:placeID/comments", placesController.placeComments); // place 후기

module.exports = router;
