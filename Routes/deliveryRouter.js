const router = require("express").Router();
const auth = require("../Middleware/auth");
const Delivery = require("../Models/deliveryModel");

router.post("/update", auth, (req, res) => {
  try {
    Delivery.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true },
      (err, foundUser) => {
        if (err) return res.json(err);
        else return res.json(foundUser);
      }
    );
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.get("/details", auth, (req, res) => {
  try {
    Delivery.findOne({ user: req.user.id }, (err, found) => {
      if (err) res.json(err);
      res.json(found);
    });
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

module.exports = router;
