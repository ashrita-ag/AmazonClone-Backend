const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.json({ msg: "Email already exists" });

    if (password.length < 6) return res.json({ msg: "Password too short" });

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
    });

    return res.json({ accesstoken }); //newUser
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.json({ msg: "Email does not exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.json({ msg: "Incorrect Password" });

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: false,
      path: "/user/token",
    });

    res.json({ accesstoken, id: user._id });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.get("/info", auth, async (req, res) => {
  try {

    const curentUser = await User.findById(req.user.id).select("-password");
    if (!curentUser) return res.json({ msg: "User does not exists" });
    return res.json(curentUser );
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.get("/token", (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    // return res.json(req.cookies);
    if (!rf_token) return res.json({ msg: "plz Login or register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) return res.json({ msg: "Login or register" });

      const accesstoken = createAccessToken({ id: user.id });
      // res.json(accesstoken);
      return res.json({accesstoken });
    });
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/token" });
    return res.json({ msg: "logout success" });
  } catch (err) {
    return res.json({ err: err.message });
  }
});

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};

module.exports = router;
