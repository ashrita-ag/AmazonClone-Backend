const router = require("express").Router();
const auth = require("../Middleware/auth");
const Address = require("../Models/addressModel");

router.get("/show", auth, async (req, res) => {
  try {
    const found = await Address.find({ user: req.user.id });
    return res.json(found);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.post("/save", auth, async (req, res) => {
  try {
    var address = req.body;
    address["user"] = req.user.id;

    const newAddress = new Address(address);
    await newAddress.save();

    return res.json(newAddress);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

router.patch("/delete", auth, async (req, res) => {
  try {
    const found = await Address.findOneAndDelete({ _id: req.body.id });
    if (!found) return res.json({ errorMsg: "No such Address Found" });
    else return res.json(found);
  } catch (e) {
    return res.json({ errorMsg: e.message });
  }
});

module.exports = router;
