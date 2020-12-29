// const router = require("express").Router();
// const auth = require("../Middleware/auth");
// const Order = require("../Models/orderModel");
// const Delivery = require("../Models/deliveryModel");

// router.post("/createOrder", auth, async (req, res) => {
//   try {
//     Delivery.findOne({ user: req.user.id }, async (found, err) => {
//       const newOrder = new Order({
//         user: found.user,
//         address: found.address,
//         subtotal: found.subtotal,
//         cart: req.cart,
//       });

//       await newOrder.save();
//       res.json(newOrder);
//     });
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

// router.patch("/add", auth, (req, res) => {
//   try {
//     Order.findOneAndUpdate(
//       { _id: req.body.id },
//       { $set: { status: "success" } },
//       { new: true },
//       (err, foundOrder) => {
//         if (err) return res.json(err);
//         else return res.json(foundOrder);
//       }
//     );
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

// router.get("/details", auth, (req, res) => {
//   try {
//     Order.findOne({ user: req.user.id }, (err, found) => {
//       if (err) res.json(err);
//       res.json(found);
//     });
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

// module.exports = router;
