const router = require("express").Router();
const Product = require("../Models/productModel");

router.get("/cat/:id", async (req, res) => {
  try {
    const docs = await Product.find({ category: req.params.id });
    if (docs) return res.json(docs);
    else return res.json({ errorMsg: "No Product Found for this Category" });
  } catch (err) {
    res.json({ errorMsg: err });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const found = await Product.findById(req.params.id);
    if (found) return res.json(found);
    else return res.json({ errorMsg: "No such product exists" });
  } catch (err) {
    res.json({ errorMsg: err });
  }
});

// router.get("/cat/:id", (req, res) => {
//   try {
//     Product.find({ category: req.params.id }, (err, docs) => {
//       if (err) {
//         res.json({ errorMsg: err.message });
//       } else {
//         res.json(docs);
//       }
//     });
//   } catch (err) {
//     res.json({ errorMsg: err.message });
//   }
// });

// router.get("/detail/:id", (req, res) => {
//   try {
//     Product.findById(req.params.id, (err, found) => {
//       if (err) {
//         res.json({ errorMsg: err.message });
//       } else {
//         res.json(found);
//       }
//     });
//     // res.json("hi");
//   } catch (err) {
//     res.json({ errorMsg: err.message });
//   }
// });

module.exports = router;
