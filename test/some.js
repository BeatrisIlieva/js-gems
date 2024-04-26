const request = require("supertest");
const Jewelry = require("../src/models/Jewelry");
const app = require("../src/index");
// const jewelryController = require("../src/controllers/jewelryController");

// const express = require("express");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const mongoose = require("mongoose");
// const expressConfig = require("../src/config/expressConfig");
// const handlebarsConfig = require("../src/config/handlebarsConfig");
// const dbConnect = require("../src/config/dbConfig");
// const routes = require("../src/routes");
// const { SECRET } = require("../src/config/config");
// const {
//   storeOriginalUrl,
// } = require("../src/middlewares/storeOriginalUrlMiddleware");
// const flash = require("express-flash");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/JSGems", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const app = express();

// app.use(
//   session({
//     secret: SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: "mongodb://127.0.0.1:27017/JSGems",
//     }),
//     cookie: { maxAge: 180 * 60 * 1000 },
//   })
// );

// const PORT = 5050;

// expressConfig(app);
// handlebarsConfig(app);

// dbConnect()
//   .then(() => console.log("DB connected"))
//   .catch((err) => {
//     console.log("DB error: ", err.message);
//   });

// app.use(flash());

// app.use(storeOriginalUrl);

// app.use(routes);

// // app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

describe("get all jewelries by category", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/JSGems", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return 200", async () => {
    // let jewelry;
    // beforeEach(async () => {
    //   jewelry = await Jewelry.create({
    //     title: "Classics",
    //     firstImageUrl:
    //       "https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp",
    //     secondImageUrl:
    //       "https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp",
    //     category: 2,
    //   });
    // });

    // console.log(jewelry);

    it('GET /products - should fetch products',  async () => {
      return await request(app).get(`/jewelries/${2}`)
        .then(res => {
          // expect(res.body.products).toBeDefined();
          // expect(_.isArray(res.body.products)).toBeTruthy();
          // expect(res.body.products.length).toEqual(3);
          console.log(res.body);
          expect(res.statusCode).toEqual(200)
        });

    const response = await request(app)
      .get(`/jewelries/${2}`)
      .set("content-type", "application/json");

        console.log(response);
    console.log(response.body);
    console.log(response.headers);

    expect(response.status).toBe(200);

    // expect(response.body).toHaveProperty("jewelry");
    // expect(response.body).toHaveProperty("tasks");
    // expect(response.body)

    // const res = await request(app)
    //   .get("/2") // Replace '1' with your desired category ID for testing
    //   .expect(200);

    // expect(res.body.jewelries).toHaveLength(1); // Check if two jewelries are returned
    // expect(res.body.jewelries[0]._id).toBe(3); // Check the first jewelry's ID
    // // expect(res.body.jewelries[1]._id).toBe(2); // Check the second jewelry's ID
  });

  // it('should handle error if something goes wrong', async () => {
  //   Jewelry.find = await jest.fn().mockRejectedValue(new Error('Database error'));

  //   const res = await request(app)
  //     .get('/2')
  //     .expect(500);

  //   expect(res.text).toBe('500 Internal Server Error');
  // });

  // Add more test cases based on your logic, for example, testing loadMore, selection queries, etc.
});
