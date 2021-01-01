const router = require("express").Router();
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");
const User = require("../Models/userModel");

// router.post("/update", auth, (req, res) => {
//   try {
//     Delivery.findOneAndUpdate(
//       { user: req.user.id, status: false },
//       { $set: req.body },
//       { new: true },
//       (err, found) => {
//         if (err) return res.json(err);
//         const { cart, speed, gift } = found;
//         const cost = updateCost(cart);
//         const finalcost = updateFinalCost(gift, speed, cost);
//         found.updateOne(
//           { $set: { cost: cost, finalcost: finalcost } },
//           { new: true },
//           (err, docs) => {
//             if (err) return res.json(err);
//             else return res.json(docs);
//           }
//         );
//       }
//     );
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

router.post("/update_speed", auth, (req, res) => {
  try {
    Delivery.findOneAndUpdate(
      { user: req.user.id, status: false },
      { $set: req.body },
      { new: true },
      (err, found) => {
        if (err) return res.json(err);
        found.finalcost = updateFinalCost(found.gift, found.speed, found.cost);
        res.json(found);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.post("/update_address", auth, (req, res) => {
  try {
    Delivery.findOneAndUpdate(
      { user: req.user.id, status: false },
      { $set: req.body },
      { new: true },
      (err, found) => {
        if (err) return res.json(err);
        res.json(found);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.post("/update_payment", auth, (req, res) => {
  try {
    Delivery.findOneAndUpdate(
      { user: req.user.id, status: false },
      { $set: req.body },
      { new: true },
      (err, found) => {
        if (err) return res.json(err);
        res.json(found);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const docs = await Delivery.deleteMany({
      user: req.user.id,
      status: false,
    });

    const user = await User.findOne({ _id: req.user.id });
    const userCart = user.cart;
    const cost = updateCost(userCart);
    const finalcost = updateFinalCost(req.body.gift, 0, cost);
    const newDelivery = new Delivery({
      user: req.user.id,
      gift: req.body.gift,
      cart: userCart,
      cost: cost,
      finalcost: finalcost,
    });
    await newDelivery.save();
    res.json(newDelivery);
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.get("/details", auth, (req, res) => {
  try {
    Delivery.findOne({ user: req.user.id, status: false }, (err, found) => {
      if (err) res.json(err);
      res.json(found);
    });
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

const updateCost = (cart) =>
  cart.reduce(
    (amt, item) => amt + parseInt(item.price) * parseInt(item.count),
    0
  );

const updateFinalCost = (gift, deliverySpeed, cost) => {
  const g = gift ? 25 : 0;
  const d = deliverySpeed > 0 ? deliverySpeed : cost >= 500 ? 0 : 40;
  return cost + g + d;
};

module.exports = router;
