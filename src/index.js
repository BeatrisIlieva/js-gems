const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/dbConfig");
const routes = require("./routes");
const { SECRET } = require("./config/config");
const {
  storeOriginalUrl,
} = require("./middlewares/storeOriginalUrlMiddleware");
const flash = require('express-flash');

mongoose
  .connect("mongodb://127.0.0.1:27017/JSGems", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/JSGems",
    }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

const PORT = 5050;

expressConfig(app);
handlebarsConfig(app);

dbConnect()
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB error: ", err.message);
  });

app.use(flash());

app.use(storeOriginalUrl);

app.use(routes);

// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
