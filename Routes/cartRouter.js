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

// router.patch("/update_cart", auth, (req, res) => {
//   try {
//     User.findById(req.user.id, (err, found) => {
//       if (err) return res.json(err);
//       else {
//         const { cart } = found;
//         const productID = req.body.product;
//         const index = cart.findIndex((cartItem) => cartItem._id === productID);
//         if (index > -1) {
//           // found.update()
//           cart[index].count = cart[index].count + 1;

//           res.json(cart[index]);

//         }
//         else res.json({ cart, productID });


//         // const index = cart.findIndex(
//         //   (cartItem) => cartItem._id === req.item._id
//         // );
//         // if (index < 0) {
//         //   found.cart.push(req.item);
//         //   found
//         //     .save()
//         //     .then(() => {
//         //       res.json(found.cart);
//         //     })
//         //     .catch((e) => res.json(e));
//         // } else {
//         // }
//         // res.json(cart);
//       }
//     });
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

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

router.patch("/delete_cart", auth, (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { cart: [] } },
      { new: true },
      (err, foundUser) => {
        if (err) return res.json(err);
        else return res.json(foundUser);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

module.exports = router;
