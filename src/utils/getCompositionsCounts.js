const Jewelry = require("../models/Jewelry");
const {
  isSelectionEmpty,
  isArrayEmpty,
} = require("../utils/checkIfCollectionIsEmpty");

exports.getCompositionsCounts = async (
  collection,
  categoryId,
  matchReplacer
) => {
  for (let i = 0; i < collection.length; i++) {
    const item = collection[i];
    const itemId = item._id;
    const count = await getCompositionsByCount(
      categoryId,
      itemId,
      matchReplacer
    );
    item["count"] = count;
  }

  return collection;
};

const getCompositionsByCount = async (categoryId, itemId, matchReplacer) => {
  const result = await Jewelry.aggregate([
    {
      $match: {
        category: categoryId,
      },
    },
    {
      $match: {
        [matchReplacer]: itemId,
      },
    },
    {
      $count: "count",
    },
  ]);

  if (!isArrayEmpty(result)) {
    const count = Object.values(result[0]).map(Number);
    return count[0];
  } else {
    return 0;
  }
};
