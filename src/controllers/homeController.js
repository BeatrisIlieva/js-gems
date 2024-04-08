const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/search", async (req, res) => {
//   const {search} = req.query;
//   const jewelries = await searchManager.getAll(search);
//   res.render("searchResults", {jewelries, search})
// })

router.get("/404", (req, res) => {
    res.render("404");
})

module.exports = router;
