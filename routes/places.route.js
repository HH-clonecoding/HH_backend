const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware"); // router.get 추후 미들웨어 사용해야 한다 like 사용하기 위해서
const router = express.Router();

const PlacesController = require("../controllers/places.controller");
const placesController = new PlacesController();

/**
 * @swagger
 * paths:
 *  /api/place/{cityID}:
 *   post:
 *    tags:
 *    - /place
 *    description: 모텔 정보 조회
 *    parameters:
 *    - in: path
 *      name: cityID
 *      description: 예시) city 인천 데이터가 6개 있다고 가정하고 splitNumber가 4, cityID 가 1 이라면 4개의 값을 보여줍니다. cityID가 2로 바꾸면 나머지 2개의 값을 보여줍니다.
 *      required: true
 *      schema:
 *        type: string
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          city:
 *            type: string
 *          splitNumber:
 *            type: integer
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

router.post("/:cityID", placesController.mainPage);

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

router.get("/:placeID", placesController.Review);

module.exports = router;
