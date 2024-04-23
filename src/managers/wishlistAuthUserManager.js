const Wishlist = require("../models/Wishlist");
const Jewelry = require("../models/Jewelry");
const User = require("../models/User");
const { setJewelriesLikedAuthUser } = require("../utils/setIsLikedAuthUser");

exports.create = async (userId, jewelryId) => {
  wishlist = await Wishlist.create({
    user: userId,
    jewelry: jewelryId,
  });
};

exports.delete = async (userId, jewelryId) => {
  wishlistItem = await Wishlist.findOneAndDelete({
    user: userId,
    jewelry: jewelryId,
  });
};

exports.getAll = async (userId) => {
  const user = await User.findById(userId);

  let jewelries = await Jewelry.aggregate([
    {
      $lookup: {
        as: "wishlists",
        from: "wishlists",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $match: {
        "wishlists.user": user._id,
      },
    },
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

  jewelries = await setJewelriesLikedAuthUser(jewelries, userId);

  return jewelries;
};
