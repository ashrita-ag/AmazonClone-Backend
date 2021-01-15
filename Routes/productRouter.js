const router = require("express").Router();
const Product = require("../Models/productModel");

router.get("/cat/:p", async (req, res) => {
  try {
    const docs = await Product.find({ category: req.params.p });
    return res.json(docs);
  } catch (e) {
    res.json({ errorMsg: e.message });
  }
});

router.get("/detail/:p", async (req, res) => {
  try {
    const found = await Product.findById(req.params.p);
    if (found) return res.json(found);
    else return res.json({ errorMsg: "No such product exists" });
  } catch (e) {
    res.json({ errorMsg: e.message });
  }
});

router.post("/search", async (req, res) => {
  try {
    const searchItem = req.body.searchItem;
    const trimmed = searchItem.trim();
    const found = await Product.find({
      title: { $regex: trimmed, $options: "i" },
    });
    return res.json(found);
  } catch (e) {
    res.json({ errorMsg: e.message });
  }
});
module.exports = router;
