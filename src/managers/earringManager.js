const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");

exports.getAll = async () => {
  const categoryName = await Category.findOne({ title: "Earring" });
  category = categoryName._id;

  const earrings = await Jewelry.find({ category, quantity: { $gt: 0 } }).lean();

  return earrings;
};

exports.getOne = async (earringId) => {
    const earring = await Jewelry.findById(earringId)
    .populate("category")
    .populate("metals.kind")
    .populate("metals.caratWeight")
    .populate("stones.kind")
    .populate("stones.color")
    .populate("stones.caratWeight")
    .populate("sizes")
    .lean();

    return earring;
}

