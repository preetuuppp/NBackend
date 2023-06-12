const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, "InstaMasai");
      if (decode) {
        console.log(decode);
        req.body.userID = decode.userID;
        req.body.user = decode.user;
        next();
      } else {
        res.json({ msg: "Not authorized" });
      }
    } catch (error) {
      res.json({ msg: "not authorized" });
    }
  } else {
    res.json({ msg: "Please Login" });
  }
};

module.exports = {
  auth,
};
