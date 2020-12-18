const router = require("express").Router();
const auth = require("../Middleware/auth");
const User = require("../Models/userModel");

router.patch("/add", auth, (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: req.body },
      { new: true },
      (err, foundUser) => {
        if (err) return res.json(err);
        else return res.json(foundUser.cart);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.patch("/delete", auth, (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: req.body },
      { new: true },
      (err, foundUser) => {
        if (err) return res.json(err);
        else return res.json(foundUser.cart);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.patch("/update", auth, (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user.id, "cart._id": req.body.product },
      { $set: { "cart.$.count": req.body.count } },
      { new: true },
      (err, foundUser) => {
        if (err) return res.json(err);
        else return res.json(foundUser.cart);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

module.exports = router;
