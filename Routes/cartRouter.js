const router = require("express").Router();
const auth = require("../Middleware/auth");
const User = require("../Models/userModel");

router.patch("/add", auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: req.body },
      { new: true }
    );
    if (!foundUser) return res.json({ errorMsg: "No such Item Found" });
    else return res.json(foundUser.cart);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.patch("/update", auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user.id, "cart._id": req.body.product },
      { $set: { "cart.$.count": req.body.count } },
      { new: true }
    );
    if (!foundUser) return res.json({ errorMsg: "No such item Found" });

    const finalCart = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { cart: { count: { $lte: 0 } } } },
      { new: true }
    );
    if (!finalCart) return res.json({ errorMsg: "No such item Found" });

    return res.json(finalCart.cart);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

module.exports = router;
