const express = require("express");
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const { postModel } = require("../model/postmodel");

postRouter.use(auth);
//adding the posts with thw help of postRouter
postRouter.post("/add", async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.json({ msg: "New Post added successfully", post: req.body });
  } catch (err) {
    res.json({ msg: "not added post" });
  }
});

//  ********A GET route to get the details of the post with a particular id*****
postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postModel.findById(id);
    res.status(200).send({ msg: data });
  } catch (error) {
    res.status(400).send({ msg: "something went wrong" });
  }
});

// *********A GET route to get the data of all the post and filter part with qyery by comments*********
postRouter.get("/top", async (req, res) => {
  try {
    let query = {};

    query.no_of_comments = { $gte: min, $lte: max };
    const data = await postModel.find(query);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "something went wrong" });
  }
});

// ****** A GET route to handle the pages and responses as well, basically apply pagination***
postRouter.get("/number/:pagination", async (req, res) => {
  const pagination = +req.params.pagination;
  if (pagination) {
    skip_page = 2 * pagination - 2;
    const postpage = await postModel.find().limit(3).skip(skip_page);
    res.status(200).send(postpage);
  } else {
    res.send({ msg: "Page number not valid" });
  }
});

// updating the post with thw help of postRouter
postRouter.patch("/update/:postID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await postModel.findOne({ _id: postID });
    console.log(post);
    const userIDinPostDoc = post.userID;
    if (userIDinUserDoc === userIDinPostDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in post",
      //   userIDinPostDoc
      // );
      await postModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.json({ msg: `${post.title} has been updated` });
    } else {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in post",
      //   userIDinpostDoc
      // );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

//deleting the post with thw help of postRouter
postRouter.delete("/delete/:postID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await postModel.findOne({ _id: postID });
    console.log(post);
    const userIDinPostDoc = post.userID;
    if (userIDinUserDoc === userIDinPostDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in post",
      //   userIDinPostDoc
      // );
      await postModel.findByIdAndDelete({ _id: postID });
      res.json({ msg: `${post.title} has been deleted` });
    } else {
      console.log(
        "userId in USERdoc",
        userIDinUserDoc,
        "userId in post",
        userIDinpostDoc
      );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

module.exports = {
  postRouter,
};
