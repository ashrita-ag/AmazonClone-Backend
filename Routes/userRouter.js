const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.json({ errorMsg: "Email already exists" });
    if (password.length < 6)
      return res.json({ errorMsg: "Password too short" });

    const passwordHash = await bcrypt.hash(password, 10);
    const [Fname, Lname] = name.split(" ");

    const newUser = new User({
      Fname,
      Lname,
      email,
      password: passwordHash,
    });

    await newUser.save();

    //JWT Token
    const accesstoken = createAccessToken({ id: newUser._id });
    const refreshtoken = createRefreshToken({ id: newUser._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: false,
      path: "/user/token",
      domain: ".amazon-clone-by-ashrita.herokuapp.com",
    });

    return res.json({ accesstoken });
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.json({ errorMsg: "Email does not exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.json({ errorMsg: "Incorrect Password" });

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: false,
      path: "/user/token",
      domain: ".herokuapp.com",
      sameSite: "none",
      secure: true,
    });

    return res.json({ accesstoken, id: user._id });
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.get("/info", auth, async (req, res) => {
  try {
    const curentUser = await User.findById(req.user.id).select("-password");
    if (!curentUser) return res.json({ errorMsg: "User does not exists" });
    return res.json(curentUser);
  } catch (e) {
    res.json({ errorMsg: e.message });
  }
});

router.get("/token", (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.json({ errorMsg: "Please Login or register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN, (e, user) => {
      if (e) return res.json({ errorMsg: "Login or register" });

      const accesstoken = createAccessToken({ id: user.id });
      return res.json({ accesstoken });
    });
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.get("/logout", (_, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/token" });
    return res.json({ msg: "logout success" });
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};

module.exports = router;
