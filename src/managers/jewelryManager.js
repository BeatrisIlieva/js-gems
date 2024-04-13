const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");

exports.getAll = async (jewelryType) => {
  const categoryName =
    jewelryType.charAt(0).toUpperCase() + jewelryType.slice(1, -1);
  const category = await Category.findOne({ title: categoryName });
  categoryId = category._id;

  const jewelries = await Jewelry.find({
    category: categoryId,
    quantity: { $gt: 0 },
  }).lean();

  return jewelries;
};

exports.getOne = async (jewelryId) => {
  const jewelry = await Jewelry.findById(jewelryId)
    .populate("category")
    .populate("metals.kind")
    .populate("metals.caratWeight")
    .populate("stones.kind")
    .populate("stones.color")
    .populate("stones.caratWeight")
    .populate("sizes")
    .populate("price")
    .lean();

  return jewelry;
};
