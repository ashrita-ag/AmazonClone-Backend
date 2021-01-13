const router = require("express").Router();
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");

router.get("/history", auth, async (req, res) => {
  try {
    const foundOrders = await Delivery.find({
      user: req.user.id,
      status: true,
    }).sort({ createdAt: -1 });
    return res.json(foundOrders);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

module.exports = router;
