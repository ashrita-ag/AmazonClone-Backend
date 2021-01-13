const router = require("express").Router();
const Product = require("../Models/productModel");

router.get("/cat/:p", async (req, res) => {
  try {
    const docs = await Product.find({ category: req.params.p });
    return res.json(docs);
  } catch (err) {
    res.json({ errorMsg: err });
  }
});

router.get("/detail/:p", async (req, res) => {
  try {
    const found = await Product.findById(req.params.p);
    if (found) return res.json(found);
    else return res.json({ errorMsg: "No such product exists" });
  } catch (err) {
    res.json({ errorMsg: err });
  }
});

module.exports = router;
