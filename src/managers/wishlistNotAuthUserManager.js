const Jewelry = require("../models/Jewelry");
const { updateQueryByJewelryIds } = require("../utils/updateQueryByJewelryIds");

const { isSelectionEmpty } = require("../utils/checkIfCollectionIsEmpty");

exports.create = (req, jewelryId) => {
  req.session.wishlistItems = req.session.wishlistItems || {};
  req.session.wishlistItems[jewelryId] = jewelryId;
};

exports.delete = (req, jewelryId) => {
  delete req.session.wishlistItems[jewelryId];
};

exports.getAll = async (req) => {
  let jewelries;
  req.session.wishlistItems = req.session.wishlistItems || {};

  if (!isSelectionEmpty(req.session.wishlistItems)) {
    const jewelryIds = Object.keys(req.session.wishlistItems).map(Number);

    const queryByJewelryIds = await updateQueryByJewelryIds(jewelryIds);

    jewelries = await Jewelry.aggregate([
      ...queryByJewelryIds,
      {
        $lookup: {
          as: "inventories",
          from: "inventories",
          foreignField: "jewelry",
          localField: "_id",
        },
      },
      {
        $lookup: {
          as: "categories",
          from: "categories",
          foreignField: "_id",
          localField: "category",
        },
      },
      {
        $match: {
          "inventories.quantity": {
            $gt: 0,
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          price: {
            $first: {
              $arrayElemAt: ["$inventories.price", 0],
            },
          },
          firstImageUrl: {
            $addToSet: "$firstImageUrl",
          },
          jewelryIds: {
            $push: "$_id",
          },
          categoryTitle: {
            $addToSet: "$categories.title",
          },
          jewelryTitle: {
            $addToSet: "$title",
          },
          createdAt: {
            $first: {
              $arrayElemAt: ["$wishlists.createdAt", 0],
            },
          },
        },
      },
      {
        $project: {
          price: 1,
          firstImageUrl: 1,
          jewelryIds: 1,
          categoryTitle: 1,
          jewelryTitle: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    for (let i = 0; i < jewelries.length; i++) {
      const jewelry = jewelries[i];
      jewelryId = jewelry._id;
      let isLikedByUser = jewelryIds.includes(jewelryId);

      jewelry["isLikedByUser"] = isLikedByUser;
    }
  }

  return jewelries;
};
