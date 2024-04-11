const mongoose = require("mongoose");
const {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  LAST_NAME_MIN_LENGTH_ERROR_MESSAGE,
  PHONE_NUMBER_MIN_LENGTH,
  PHONE_NUMBER_MAX_LENGTH,
  PHONE_NUMBER_MIN_LENGTH_ERROR_MESSAGE,
  PHONE_NUMBER_MAX_LENGTH_ERROR_MESSAGE,
  COUNTRY_MIN_LENGTH,
  COUNTRY_MAX_LENGTH,
  COUNTRY_MIN_LENGTH_ERROR_MESSAGE,
  COUNTRY_MAX_LENGTH_ERROR_MESSAGE,
  CITY_MIN_LENGTH,
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH_ERROR_MESSAGE,
  CITY_MAX_LENGTH_ERROR_MESSAGE,
  ADDRESS_MIN_LENGTH,
  ADDRESS_MAX_LENGTH,
  ADDRESS_MIN_LENGTH_ERROR_MESSAGE,
  ADDRESS_MAX_LENGTH_ERROR_MESSAGE,
} = require("../constants/profile");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    // required: [true, "First name is required!"],
    minLength: [FIRST_NAME_MIN_LENGTH, FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [FIRST_NAME_MAX_LENGTH, FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE],
  },
  lastName: {
    type: String,
    // required: [true, "Last name is required!"],
    minLength: [LAST_NAME_MIN_LENGTH, LAST_NAME_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [LAST_NAME_MAX_LENGTH, LAST_NAME_MAX_LENGTH_ERROR_MESSAGE],
  },
  phoneNumber: {
    type: String,
    // required: [true, "Phone Number is required!"],
    minLength: [PHONE_NUMBER_MIN_LENGTH, PHONE_NUMBER_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [PHONE_NUMBER_MAX_LENGTH, PHONE_NUMBER_MAX_LENGTH_ERROR_MESSAGE],
  },
  country: {
    type: String,
    // required: [true, "Country is required!"],
    minLength: [COUNTRY_MIN_LENGTH, COUNTRY_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [COUNTRY_MAX_LENGTH, COUNTRY_MAX_LENGTH_ERROR_MESSAGE],
  },
  city: {
    type: String,
    // required: [true, "City is required!"],
    minLength: [CITY_MIN_LENGTH, CITY_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [CITY_MAX_LENGTH, CITY_MAX_LENGTH_ERROR_MESSAGE],
  },
  address: {
    type: String,
    // required: [true, "Delivery Address is required!"],
    minLength: [ADDRESS_MIN_LENGTH, ADDRESS_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [ADDRESS_MAX_LENGTH, ADDRESS_MAX_LENGTH_ERROR_MESSAGE],
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
