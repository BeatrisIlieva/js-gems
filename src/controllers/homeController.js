const router = require("express").Router();
// const earringManager = require("../managers/earringManager");

router.get("/", (req, res) => {
    const {search, from , to} = req.query;
  res.render("index", {search, from , to});
  // res.render("index", {earrings, search, from , to});
});

router.get("/404", (req, res) => {
    res.render("404");
})

module.exports = router;
