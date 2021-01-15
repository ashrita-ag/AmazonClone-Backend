const mongoose = require("mongoose");
const data = require("../data");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);
// Product.deleteMany({},(err) => console.log(err));
// Product.insertMany(data.productsHome, (err) => {
//   if (err) console.log(err);
//   else console.log("Home inserted");
// });
// Product.insertMany(data.productsNew, (err) => {
//   if (err) console.log(err);
//   else console.log("NewProduct inserted");
// });
// Product.insertMany(data.productsAdd, (err) => {
//   if (err) console.log(err);
//   else console.log("Additional inserted");
// });

module.exports = Product;
