const router = require("express").Router();
const Product = require("../Models/ProductModel");

router.get("/cat/:id", (req, res) => {
  try {
    Product.find({ category: req.params.id }, (err, docs) => {
      if (err) {
        res.json({ msg: err.message });
      } else {
        res.json(docs);
      }
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

module.exports = router;
