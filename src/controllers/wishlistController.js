const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const wishlistManager = require("../managers/wishlistManager");


router.get("/:jewelryId", isAuth, async (req, res) => {
    try {
        const userId = req.user._id;
    
        // let bagCount = 0;
        // let bagCountGreaterThanOne = false;
    
        const jewelries = await wishlistManager.getAll(userId);

        

      } catch (err) {
        console.log(err.message);
        res.render("500");
      }
});


router.post("/:jewelryId/create", isAuth, async(req, res)=>{
    try {
        const userId = req.user._id;
        console.log("here");
    
        const jewelryId = req.params.jewelryId;
    
        await wishlistManager.create({userId, jewelryId});

        const referer = req.get('referer');
        res.redirect(referer); 

      } catch (err) {
        console.log(err.message);
        res.render("500");
      }
});

router.post("/:jewelryId/delete", isAuth, async(req, res)=>{
    try {
        const userId = req.user._id;
        console.log("here");
    
        const jewelryId = req.params.jewelryId;
    
        await wishlistManager.delete({userId, jewelryId});
    
        const referer = req.get('referer');
        res.redirect(referer); 

      } catch (err) {
        console.log(err.message);
        res.render("500");
      }
});

module.exports = router;