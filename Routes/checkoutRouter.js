const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");

router.post("/create-payment-intent", auth, async (req, res) => {
  try {
    const found = await Delivery.findOne({ user: req.user.id, status: false });
    const { finalcost } = found;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalcost * 100,
      currency: "inr",
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (err) {
    res.json({ errorMsg: err });
  }
});

module.exports = router;
