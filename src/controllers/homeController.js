const router = require("express").Router();
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const Jewelry = require("../models/Jewelry");

router.get("/", getBagCount, getLikeCount, async (req, res) => {
  // const userId = req.user?._id;
  try {
    res.render("index");
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/search", async (req, res) => {
  try {
    const search = req.query["search"][1];
    const searchResult = await Jewelry.aggregate([
      {
        $lookup: {
          as: "jewelrymetals",
          from: "jewelrymetals",
          foreignField: "jewelry",
          localField: "_id",
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
        $lookup: {
          as: "metals",
          from: "metals",
          foreignField: "_id",
          localField: "jewelrymetals.metal",
        },
      },
      {
        $lookup: {
          as: "jewelrystones",
          from: "jewelrystones",
          foreignField: "jewelry",
          localField: "_id",
        },
      },
      {
        $lookup: {
          as: "stonetypes",
          from: "stonetypes",
          foreignField: "_id",
          localField: "jewelrystones.stoneType",
        },
      },
      {
        $lookup: {
          as: "stonecolors",
          from: "stonecolors",
          foreignField: "_id",
          localField: "jewelrystones.stoneColor",
        },
      },
      {
        $match: {
          $or: [
            {
              title: {
                $regex: new RegExp(search, "i"),
              },
            },
            {
              "metals.title": {
                $regex: new RegExp(search, "i"),
              },
            },
            {
              "categories.title": {
                $regex: new RegExp(search.replace(/s$/, "(s|)"), "i"),
              },
            },
            {
              "stonetypes.title": {
                $regex: new RegExp(search, "i"),
              },
            },
            {
              "stonecolors.title": {
                $regex: new RegExp(search, "i"),
              },
            },
          ],
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
        },
      },
      {
        $project: {
          price: 1,
          firstImageUrl: 1,
          jewelryIds: 1,
          categoryTitle: 1,
          jewelryTitle: 1,
        },
      },
    ]);
    res.render("common/searchResults", { searchResult });
    console.log(searchResult);
    console.log(search);
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
