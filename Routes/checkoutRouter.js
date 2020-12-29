const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");

router.post("/create-payment-intent", auth, async (req, res) => {
  Delivery.findOne({ user: req.user.id }, async (err, found) => {
    if (err) {
      console.log(req.user);
    }
    const { cost, gift, speed } = found;
    const g = gift ? 25 : 0;
    const d = speed ? speed : cost >= 500 ? 0 : 40;

    const f = cost + g + d;
    // console.log(found);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: f * 100,
      currency: "inr",
    });

    // console.log(paymentIntent.client_secret);
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  });
});

module.exports = router;
