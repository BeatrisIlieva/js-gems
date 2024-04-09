const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minLength: [5, "Email is too short"],
    match: /^[A-za-z0-9]+@+[a-z]+\.[a-z]+$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
        validator: function(value) {
            return /^[A-za-z0-9]+$/.test(value);
        },
        message: `Password must be alphanumeric!`
    },
    minLength: [8, "Password is too short!"],
  },
});

userSchema.virtual("repeatPassword")
    .set(function(value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError("The two password fields didn't match.!");
        }
    });

userSchema.pre("save", async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
})

const User = mongoose.model("User", userSchema);

module.exports = User;
