const { Places, Comments } = require("../models");

class PlacesRepository {
  getSplitCity = async (city, splitNumber) => {
    const total = await Places.count({ where: { city } });

    // 게시글 가져오기
    const placesSplit = await Places.findAll({
      where: { city }, // 도시 조건
      order: [["createdAt", "DESC"]], // createdAt 역순으로 정렬
      offset: splitNumber * (page - 1), // 페이지당 게시글 수만큼 건너뛰기
      limit: splitNumber, // 페이지당 게시글 수만큼 가져오기
      attributes: ["pictures ", "name", "star"],
    });

    const replacesSplit = await Promise.all(
      placesSplit.map(async (ele) => {
        const findPlacename = await Comments.findAll({
          where: { name: ele.name },
        });
        return {
          picture: ele.picture,
          name: ele.name,
          star: ele.star,
          commentCount: findPlacename.length ?? 0,
        };
      })
    );

    const totalPlaces = Math.ceil(total / splitNumber);

    return replacesSplit;
  };
}

module.exports = PlacesRepository;
