const router = require("express").Router();

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Hz0IIKQyTwAQr5fjZHZuulQRoLm0SD9iLbQ92tMOnS1Kdfy1mhaRQKLOJHAfvSPRJdUHOk9ULxQZZ6HjClgkcz100vcUCUt4h"
);

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

module.exports = router;
