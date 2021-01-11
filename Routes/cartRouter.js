const router = require("express").Router();
const auth = require("../Middleware/auth");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");

router.patch("/add", auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: req.body },
      { new: true }
    );
    return res.json(foundUser.cart);
  } catch (err) {
    return res.json({ errorMsg: err.message });
  }
});

router.patch("/add_cart", auth, async (req, res) => {
  try {
    const item = await User.find({
      _id: req.user.id,
      "cart._id": req.body.product,
    });

    if (!item) {
      const docs = Product.findById(req.body.product);
      if (!docs) return res.json({ errorMsg: "No such product exists" });
      docs["count"] = 1;
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { cart: docs } },
        { new: true }
      );
      return res.json(updatedUser.cart);
    } else {
      const { count } = item;
      const foundUser = await User.findOneAndUpdate(
        { _id: req.user.id, "cart._id": req.body.product },
        { $set: { "cart.$.count": count + 1 } },
        { new: true }
      );
      return res.json(foundUser.cart);
    }
  } catch (err) {
    return res.json({ errorMsg: err });
  }
}); //test this

router.patch("/update", auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user.id, "cart._id": req.body.product },
      { $set: { "cart.$.count": req.body.count } },
      { new: true }
    );
    const finalCart = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { cart: { count: { $lte: 0 } } } },
      { new: true }
    );
    return res.json(finalCart.cart);
  } catch (err) {
    return res.json({ errorMsg: err.message });
  }
});

router.patch("/delete_cart", auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { cart: [] } },
      { new: true }
    );
    return res.json(foundUser);
  } catch (err) {
    return res.json({ errorMsg: err.message });
  }
});

// router.patch("/add", auth, (req, res) => {
//   try {
//     User.findOneAndUpdate(
//       { _id: req.user.id },
//       { $push: req.body },
//       { new: true },
//       (err, foundUser) => {
//         if (err) return res.json(err);
//         else return res.json(foundUser.cart);
//       }
//     );
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });


module.exports = router;
