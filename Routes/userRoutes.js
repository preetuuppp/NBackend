const express = require("express");
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

// registering the user with thw help of userRouter
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    //chicking if the user  exists
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.json({ msg: "something went wrong" });
        } else {
          const user = new userModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
            is_married,
          });
          await user.save();
          res.json({ msg: "user Successfully registered", user: req.body });
        }
      });
    }
  } catch (error) {
    res.json({ msg: "user not registered" });
  }
});

// logging the user with thw help of userRouter
userRouter.post("/login", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.name },
            "InstaMasai",
            { expiresIn: "7d" }
          );
          res.json({ msg: "Successfully logged in", token });
        } else {
          res.json({ error: "Failed to log in" });
        }
      });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json(error);
  }
});

// logout the user with thw help of userRouter
userRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    blacklist.push(token);
    await blacklistedToken.save();
    res.status(200).json({ msg: "User has been logged out" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
