const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.json({
        errorMsg: "Invalid Authentication.Please Login Again.",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err)
        return res.json({
          errorMsg: "Invalid Authentication.Please Login Again.",
        });
      req.user = user;
      next();
    });
  } catch (err) {
    res.json({ errorMsg: err.mesage });
  }
};

module.exports = auth;
