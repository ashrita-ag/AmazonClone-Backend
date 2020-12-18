const router = require("express").Router();
const auth = require("../Middleware/auth");
const Address = require("../Models/addressModel");

router.get("/show", auth, (req, res) => {
  try {
    Address.find({ user: req.user.id }, (err, found) => {
      if (err) res.json(err);
      else res.json(found);
    });
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.post("/save", auth, async (req, res) => {
  try {
    var address = req.body;
    address["user"] = req.user.id;
    console.log(address);

    const newAddress = new Address(address);
    await newAddress.save();

    res.json(newAddress);
  } catch (err) {
    return res.json({ msg: err.message });
  }
});

module.exports = router;
