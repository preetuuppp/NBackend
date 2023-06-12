const mongoose = require("mongoose");
require("dotenv").config();
const newConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.mongoUrl);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = {
  newConnect,
};
