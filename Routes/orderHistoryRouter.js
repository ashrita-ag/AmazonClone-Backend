const router = require("express").Router();
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");

router.get("/history", auth, async(req, res) => {
  try {
    const foundOrders = await Delivery.find({
      user: req.user.id,
      status: true,
    })
    .sort({ createdAt: -1 });
    res.json(foundOrders);

  } catch (err) {
    return res.json({ msg: err.message });
  }
});

module.exports = router;
