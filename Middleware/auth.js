const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.json({
        errorMsg: "Invalid Authentication",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN, (e, user) => {
      if (e)
        return res.json({
          errorMsg: "Invalid Authentication",
        });
      req.user = user;
      next();
    });
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
};

module.exports = auth;
