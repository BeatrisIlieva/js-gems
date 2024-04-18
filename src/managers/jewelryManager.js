const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");
const Metal = require("../models/Metal");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");
const { setJewelriesLiked } = require("../utils/setIsLikedAuthUser");
const { isSelectionEmpty } = require("../utils/checkIfCollectionIsEmpty");

const wishlistController = require("../controllers/wishlistController");

const { updateSelectionQuery } = require("../utils/updateSelectionQuery");
const { getCompositionsCounts } = require("../utils/getCompositionsCounts");

exports.getAll = async (categoryId, selection) => {
  let query = {
    category: categoryId,
    quantity: { $gt: 0 },
  };

  if (!isSelectionEmpty(selection)) {
    query = updateSelectionQuery(selection, query);
  }

  let jewelries = await Jewelry.find(query).lean();

  const metals = await Metal.find().lean();

  metalMatchReplacer = "metals.kind";

  let metalsByCount = await getCompositionsCounts(
    metals,
    categoryId,
    metalMatchReplacer
  );

  metalsByCount = metalsByCount.filter((item) => item.count !== 0);

  const stoneTypes = await StoneType.find().lean();

  stoneTypeMatchReplacer = "stones.kind";

  let stoneTypesByCount = await getCompositionsCounts(
    stoneTypes,
    categoryId,
    stoneTypeMatchReplacer
  );

  stoneTypesByCount = stoneTypesByCount.filter((item) => item.count !== 0);

  const stoneColors = await StoneColor.find().lean();

  stoneColorMatchReplacer = "stones.color";

  let stoneColorsByCount = await getCompositionsCounts(
    stoneColors,
    categoryId,
    stoneColorMatchReplacer
  );

  stoneColorsByCount = stoneColorsByCount.filter((item) => item.count !== 0);

  return { jewelries, metalsByCount, stoneTypesByCount, stoneColorsByCount };
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
