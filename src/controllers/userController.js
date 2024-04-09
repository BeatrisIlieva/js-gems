const router = require("express").Router();
const userManager = require("../managers/userManager");
const { extractErrorMessages } = require("../utils/errorHelpers");
const {TOKEN_KEY} = require("../config/config");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  try {
    await userManager.register({ email, password, repeatPassword });

    res.redirect("/users/login");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.status(404).render("users/register", { errorMessages });
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
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/users/login");
});

module.exports = router;
