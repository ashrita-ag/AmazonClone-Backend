const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.json({
        errorMsg: "Invalid Authentication",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err)
        return res.json({
          errorMsg: "Invalid Authentication",
        });
      req.user = user;
      next();
    });
  } catch (err) {
    res.json({ errorMsg: err.mesage });
  }
};

module.exports = auth;
