const mongoose = require("mongoose");
const postShema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("post", postShema);

module.exports = {
  postModel,
};
