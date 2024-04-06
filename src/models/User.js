const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    // validate: {
    //     validator: function(value) {
    //         return this.repeatPassword === value;
    //     },
    //     message: `The two password fields didn't match.!`
    // }
  },
});

userSchema.virtual("repeatPassword")
    .set(function(value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError("The two password fields didn't match.!");
        }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;
