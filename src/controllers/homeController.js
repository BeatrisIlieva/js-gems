const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/earrings", (req, res) => {
    res.render("earrings");
});

module.exports = router;
