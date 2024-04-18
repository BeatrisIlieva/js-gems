exports.getCompositionsByCount = async (categoryId, itemId, matchReplacer) => {
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
