exports.updateSelectionQuery = (selection, query) => {
  const keys = Object.keys(selection);

  keys.forEach((key) => {
    let selectedField;

    if (key === "Metal") {
      selectedField = "metals.kind";
    } else if (key === "StoneType") {
      selectedField = "stones.kind";
    } else if (key === "StoneColor") {
      selectedField = "stones.color";
    }
    const array = selection[key];

    if (!Array.isArray(array)) {
      query[selectedField] = { $in: [Number(array)] };
    } else {
      const numbersArray = array.map((item) => Number(item));
      query[selectedField] = { $in: numbersArray };
    }
  });
  console.log(query);
  return query;
};
