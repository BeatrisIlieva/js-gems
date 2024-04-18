// const wishlistAuthUserManager = require("../managers/wishlistAuthUserManager");
const Wishlist = require("../models/Wishlist");

exports.transferSessionWishlistToModelWishlist = async (req, userId) => {
  if (req.session.wishlistItems) {
    jewelryIds = Object.keys(req.session.wishlistItems).map((item) =>
      Number(item)
    );

    let dataToInsert = [];

    jewelryIds.reduce((acc, curr) => {
      acc = {user: userId, jewelry: curr};
      dataToInsert.push(acc);
      return acc;
    }, {});

    console.log(dataToInsert);

    await Wishlist.insertMany(dataToInsert);

    req.session.wishlistItems = {};
  }
};
