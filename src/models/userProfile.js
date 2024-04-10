const mongoose = require("mongoose");
const {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
} = require("../constants/userProfile");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    minLength: [FIRST_NAME_MIN_LENGTH, FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [FIRST_NAME_MAX_LENGTH, FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    validate: {
      validator: function (value) {
        return /^[A-za-z0-9]+$/.test(value);
      },
      message: `Password must be alphanumeric!`,
    },
    minLength: [8, "Password is too short!"],
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
