const mongoose = require("mongoose");
const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: String,
    password: {
      type: String,
      required: true,
    },
    age: Number,
    city: String,
    is_married: Boolean,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userShema);

module.exports = {
  userModel,
};
