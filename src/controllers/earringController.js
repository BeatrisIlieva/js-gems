const router = require("express").Router();

const earringManager = require("../managers/earringManager");

router.get("/all", async (req, res) => {
  try {
    const earrings = await earringManager.getAll();

    res.render("earrings/all", { earrings });
  } catch (err) {
    res.render("500");
  }
});

router.get("/:earringId/details", async (req, res) => {
  const earringId = req.params.earringId;
  try {
    const earring = await earringManager.getOne(earringId);

    if (!earring) {
      return res.redirect("/404");
    }

    res.render("earrings/details", { earring });
  } catch (err) {
    res.render("500");
  }
});

module.exports = router;
