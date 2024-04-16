const Wishlist = require("../models/Wishlist");

exports.create = async ({ userId, jewelryId }) => {
  wishlist = await Wishlist.create({
    user: userId,
    jewelry: jewelryId,
  });
};

exports.delete = async ({ userId, jewelryId }) => {
  wishlistItem = await Wishlist.findOneAndDelete({
    user: userId,
    jewelry: jewelryId,
  });
};

exports.isLikedByUser = async({ userId, jewelryId }) => {
  const isLikedByUser = await Wishlist.findOne({ user: userId, jewelry: jewelryId }).lean();
  console.log(isLikedByUser);
    return isLikedByUser;
};

exports.getAll = async(userId) => {
    const result = await Wishlist.findById(userId).populate("jewelry").lean();
    return result;

    // for (let i = 0; i < result.length; i++) {
    //     const jewelryId = result[i].jewelry;
    //     const wishlistId = result[i]._id;
    
    //     const jewelry = await Jewelry.findById(jewelryId)
    //       .populate("category")
    //       .populate("metals.kind")
    //       .populate("metals.caratWeight")
    //       .populate("stones.kind")
    //       .populate("stones.color")
    //       .populate("stones.caratWeight")
    //       .lean();
    //     bagItems[bagItemId] = {
    //       bagItemId,
    //       jewelry: jewelry,
    //       size: size,
    //       quantity: quantity,
    //       totalPrice: totalPrice,
    //       maxQuantity: maxQuantity,
    //       minQuantity: DEFAULT_MIN_QUANTITY,
    //     };
    //     subTotal += totalPrice;
    //   }
};

// async function isLikedByUser({ userId, jewelryId }) {
//     return await Wishlist.findOne({ userId, jewelryId }).exists;
// };
