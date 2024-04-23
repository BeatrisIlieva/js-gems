const Jewelry = require("../models/Jewelry");

exports.create = (req, jewelryId) => {
  req.session.wishlistItems = req.session.wishlistItems || {};
  req.session.wishlistItems[jewelryId] = jewelryId;
};

exports.delete = (req, jewelryId) => {
  delete req.session.wishlistItems[jewelryId];
};

exports.getAll = async (req) => {
  req.session.wishlistItems = req.session.wishlistItems || {};
  const jewelryIds = Object.keys(req.session.wishlistItems).map(Number);
  let jewelries = await Jewelry.find({ _id: { $in: jewelryIds } }).lean();

  for (let i = 0; i < jewelries.length; i++) {
    const jewelry = jewelries[i];
    jewelryId = jewelry._id;
    let isLikedByUser = jewelryIds.includes(jewelryId);

    jewelry["isLikedByUser"] = isLikedByUser;
  }
  return jewelries;
};
