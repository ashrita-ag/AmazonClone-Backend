const router = require("express").Router();
const auth = require("../Middleware/auth");
const Address = require("../Models/addressModel");

router.get("/show", auth, async (req, res) => {
  try {
    const found = await Address.find({ user: req.user.id });
    return res.json(found);
  } catch (err) {
    return res.json({ errorMsg: err.message });
  }
});

router.post("/save", auth, async (req, res) => {
  try {
    var address = req.body;
    address["user"] = req.user.id;

    const newAddress = new Address(address);
    await newAddress.save();

    return res.json(newAddress);
  } catch (err) {
    return res.json({ errorMsg: err.message });
  }
});

router.patch("/delete", auth, async (req, res) => {
  try {
    const found = await Address.findOneAndDelete({ _id: req.body.id });
    if (!found) return res.json({ errorMsg: "No such Address Found" });
    else return res.json(found);
  } catch (err) {
    return res.json({ errorMsg: err.message });
  }
});

// router.get("/show", auth, (req, res) => {
//   try {
//     Address.find({ user: req.user.id }, (err, found) => {
//       if (err) res.json(err);
//       else res.json(found);
//     });
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

// router.post("/save", auth, async (req, res) => {
//   try {
//     var address = req.body;
//     address["user"] = req.user.id;

//     const newAddress = new Address(address);
//     await newAddress.save();

//     return res.json(newAddress);
//   } catch (err) {
//     return res.json({ errorMsg: err.message });
//   }
// });

// router.post("/delete", auth, (req, res) => {
//   try {
//     Address.findOneAndDelete({ _id: req.body.id }, (err, found) => {
//       if (err) res.json(err);
//       else res.json(found);
//     });
//   } catch (err) {
//     return res.json({ msg: err.message });
//   }
// });

module.exports = router;
