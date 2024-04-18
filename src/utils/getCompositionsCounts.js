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
