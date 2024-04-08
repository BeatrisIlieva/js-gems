const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");
const Metal = require("../models/Metal");
const Size = require("../models/Size");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");

exports.getAll = async () => {
  const categoryName = await Category.findOne({ title: "Earring" });
  category = categoryName._id;

  const earrings = await Jewelry.find({ category, quantity: { $gt: 0 } }).lean();

  return earrings;
};

exports.getOne = async (earringId) => {
    const earring = await Jewelry.findById(earringId)
    .populate("category")
    .populate("metals")
    .populate("stones.kind")
    .populate("stones.color")
    .populate("stones.caratWeight")
    .populate("sizes")
    .lean();

    return earring;
}

