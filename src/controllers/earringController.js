const router = require("express").Router();

const earringManager = require("../managers/earringManager");

router.get("/earrings", (req, res) => {
  res.render("earrings");
});

router.get("/add-to-bag", (req, res) => {
  res.redirect("/shopping-bag");
});

router.post("/add-to-bag", (req, res) => {
  const { name, description, imageUrl, price } = req.body;

  earringManager.create({
    name,
    description,
    imageUrl,
    price: Number(price),
  });

  res.redirect("/shopping-bag");
});

router.get("/:earringId/details", (req, res) => {
  const earring = earringManager.getOne(req.params.earringId);
  if (!earring) {
    return res.redirect("/404");
  }
  
  res.render("earringDetails", { earring });
});

module.exports = router;
