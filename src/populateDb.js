const mongoose = require("mongoose");

const Earring = require("./models/Earring");

async function populateDb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/jsgems");

    await Earring.create({
        name: "Earring2",
        description:"Some desc",
        imageUrl: "https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct.webp",
        price: 10,
    })
  
}

populateDb();