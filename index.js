const express = require("express");
const cors = require("cors");
const { userRouter } = require("./Routes/userRoutes");
const { newConnect } = require("./db");
const { postRouter } = require("./Routes/postRoutes");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Hello Dev" });
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

newConnect().then(() => {
  app.listen(5050, async () => {
    try {
      console.log("server is running at port 5050");
    } catch (error) {
      console.log(error);
      console.log("somting went wrong");
    }
  });
});
