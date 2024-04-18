exports.setJewelriesLikedNotAuthUser = async (req, jewelries) => {
  const jewelryIds = Object.keys(req.session.wishlistItems || {}).map(Number);

  for (let i = 0; i < jewelries.length; i++) {
    const jewelry = jewelries[i];
    jewelryId = jewelry._id;
    let isLikedByUser = jewelryIds.includes(jewelryId);

    jewelry["isLikedByUser"] = isLikedByUser;
  }
  return jewelries;
};

exports.setJewelryLikedNotAuthUser = async (req, jewelry) => {
  const jewelryIds = Object.keys(req.session.wishlistItems || {}).map(Number);

  jewelryId = jewelry._id;
  let isLikedByUser = jewelryIds.includes(jewelryId);

  jewelry["isLikedByUser"] = isLikedByUser;

  return jewelry;
};

