const router = require("express").Router();

const earringManager = require("../managers/earringManager");

router.get("/shopping-bag", (req, res) => {
  res.redirect("shopping-bag");
});

module.exports = router;
