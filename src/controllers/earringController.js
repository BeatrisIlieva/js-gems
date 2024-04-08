const router = require("express").Router();

const earringManager = require("../managers/earringManager");

router.get("/all", async (req, res) => {
  const earrings = await earringManager.getAll();

  res.render("earrings/all", {earrings});
});

router.get("/:earringId/details", async (req, res) => {
  const earring = await earringManager.getOne(req.params.earringId);

  if (!earring) {
    return res.redirect("/404");
  }
  
  res.render("earrings/details", { earring });
});


module.exports = router;
