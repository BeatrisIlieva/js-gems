const express = require("express");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const homeController = require("./controllers/homeController");
const earringController = require("./controllers/earringController");

const app = express();

const PORT = 5050;

expressConfig(app);
handlebarsConfig(app);

app.use(homeController);
app.use("/earrings", earringController);
app.get("*", (req, res) => {
    res.redirect("/404");
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
