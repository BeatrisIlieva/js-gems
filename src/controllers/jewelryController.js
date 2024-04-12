const router = require("express").Router();

const jewelryManager = require("../managers/jewelryManager");

router.get("/:jewelryType", async (req, res) => {
  try {
    const jewelryType = await req.params.jewelryType;
    const jewelries = await jewelryManager.getAll(jewelryType);

    res.render("jewelries/all", { jewelries, jewelryType });
  } catch (err) {
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
    res.render("500");
  }
});

module.exports = router;
