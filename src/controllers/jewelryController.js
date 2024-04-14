const router = require("express").Router();

const jewelryManager = require("../managers/jewelryManager");

router.get("/:categoryId", async (req, res) => {
  try {
    const category = await req.params.categoryId;
    const categoryId = Number(category);
    const jewelries = await jewelryManager.getAll(categoryId);

    res.render("jewelries/all", { jewelries, categoryId });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/:jewelryId/details", async (req, res) => {
  const jewelryId = req.params.jewelryId;
  try {
    const jewelry = await jewelryManager.getOne(jewelryId);

    if (!jewelry) {
      return res.redirect("/404");
    }

    res.render("jewelries/details", { jewelry });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

module.exports = router;
