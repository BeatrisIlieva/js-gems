const router = require("express").Router();
const earringManager = require("../managers/earringManager");

router.get("/", (req, res) => {
    const {search, from , to} = req.query;
  const earrings = earringManager.getAll(search, from, to);
  res.render("index", {earrings});
});

router.get("/", (req, res) => {
  res.render("shopping-bag");
});

router.get("/earrings", (req, res) => {
  res.render("earrings");
});

router.get("/404", (req, res) => {
    res.render("404");
})

module.exports = router;
