const router = require("express").Router();
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");
const User = require("../Models/userModel");

router.patch("/update_speed", auth, async (req, res) => {
  try {
    const found = await Delivery.findOneAndUpdate(
      { user: req.user.id, status: false },
      { $set: req.body },
      { new: true }
    );
    if (!found) return res.json({ errorMsg: "No such item Found" });

    const { gift, speed, cost } = found;
    found.finalcost = updateFinalCost(gift, speed, cost);
    await found.save();
    return res.json(found);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.post("/update_address", auth, async (req, res) => {
  try {
    await Delivery.deleteMany({
      user: req.user.id,
      status: false,
    });

    const user = await User.findById(req.user.id);
    const userCart = user.cart;
    if (!userCart.length) return res.json({ errorMsg: "Cart cannot be empty" });

    const cost = updateCost(userCart);
    const finalcost = updateFinalCost(req.body.gift, 0, cost);

    const newDelivery = new Delivery({
      user: req.user.id,
      gift: req.body.gift,
      cart: userCart,
      cost: cost,
      finalcost: finalcost,
      address: req.body.address,
    });

    await newDelivery.save();
    return res.json(newDelivery);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.post("/update_payment", auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { cart: [] } },
      { new: true }
    );
    if (!foundUser) return res.json({ errorMsg: "No such User Found" });

    const found = await Delivery.findOneAndUpdate(
      { user: req.user.id, status: false },
      { $set: { status: true } },
      { new: true }
    );
    if (!found) return res.json({ errorMsg: "No delivey for this user" });
    else return res.json({ found, foundUser });
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.get("/update_cart", auth, async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.user.id });
    if (!foundUser) return res.json({ errorMsg: "No such user Found" });
    const userCart = foundUser.cart;
    const found = await Delivery.findOneAndUpdate(
      { user: req.user.id, status: false },
      { $set: { cart: userCart } },
      { new: true }
    );
    if (!found) return res.json({ errorMsg: "No such Item Found" });

    const { cart, gift, speed } = found;
    const newCost = updateCost(cart);
    const newFinalCost = updateFinalCost(gift, speed, newCost);

    const updated = await Delivery.findOneAndUpdate(
      { _id: found._id },
      { $set: { cost: newCost, finalcost: newFinalCost } },
      { new: true }
    );
    if (!updated) return res.json({ errorMsg: "No such Item Found" });
    else return res.json(updated);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
}); //check again

router.get("/details", auth, async (req, res) => {
  try {
    const found = await Delivery.findOne({ user: req.user.id, status: false });
    if (!found) return res.json({ errorMsg: "No current delivery item" });
    else return res.json(found);
  } catch (e) {
    return res.json({ errorMsg: e.message });
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
