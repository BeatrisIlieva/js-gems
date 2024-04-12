const router = require("express").Router();
const userManager = require("../managers/userManager");
const { extractErrorMessages } = require("../utils/errorHelpers");
const {TOKEN_KEY} = require("../config/config");

// router.get("/login-or-register", (req, res) => {
//   res.render("users/loginOrRegister");
// });

// router.post("/login-or-register", async (req, res, next) => {
//   const { email, password } = req.body;
  
//   try {
//     const token = await userManager.login(email, password);

//     res.cookie(TOKEN_KEY, token, { httpOnly: true });

//     res.redirect("/");
//   } catch (err) {
//       const errorMessages = extractErrorMessages(err);
//       res.status(404).render("users/login", { errorMessages });
//   }
// });

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword} = req.body;

  try {
    const token = await userManager.register({ email, password, repeatPassword });

    res.cookie(TOKEN_KEY, token);
    
    res.redirect("/");

  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.status(404).render("users/register", { errorMessages, email });
  }
});

router.get("/login", async (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const token = await userManager.login(email, password);
  
      res.cookie(TOKEN_KEY, token, { httpOnly: true });
  
      res.redirect("/");
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.status(404).render("users/login", { errorMessages });
    }
  });

router.get("/logout", (req, res) => {
  res.clearCookie(TOKEN_KEY);
  res.redirect("/users/login");
});

router.get("/:userId/delete", async (req, res) => {
  try {
    userId = req.params.userId;
    await userManager.delete(userId);
    res.clearCookie(TOKEN_KEY);
    res.redirect("/users/register");
  } catch(err){
    res.redirect("/", {error: "Unsuccessful deletion!"});
  }

})

module.exports = router;
