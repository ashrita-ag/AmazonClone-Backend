const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");

router.post("/create-payment-intent", auth, async (req, res) => {
  try {
    const found = await Delivery.findOne({ user: req.user.id, status: false });
    if (!found) return res.json({ errorMsg: "No such delivery Found" });

    const { finalcost } = found;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalcost * 100,
      currency: "inr",
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (e) {
    res.json({ errorMsg: e.message });
  }
});

module.exports = router;
