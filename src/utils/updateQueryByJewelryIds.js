exports.updateQueryByJewelryIds = async (jewelryIds) => {
  let queryByJewelryIds = [];
  let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ _id: jewelryId });
    return acc;
  }, []);
  queryByJewelryIds.push({
    $match: {
      $or: jewelryMatchCondition,
    },
  });

  return queryByJewelryIds;
};
