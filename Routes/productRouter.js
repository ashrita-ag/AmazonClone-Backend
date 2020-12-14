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

    // res.json("HI");
  } catch (err) {
    res.json({ msg: err.message });
  }
});

// router.get("/cat2", (req, res) => {});

// router.get("/cat3", (req, res) => {});

module.exports = router;
