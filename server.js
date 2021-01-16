require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: true,
  })
);

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to Database");
  }
);

app.use("/user", require("./Routes/userRouter"));
app.use("/product", require("./Routes/productRouter"));
app.use("/user/cart", require("./Routes/cartRouter"));
app.use("/address", require("./Routes/addressRouter"));
app.use("/delivery", require("./Routes/deliveryRouter"));
app.use("/checkout", require("./Routes/checkoutRouter"));
app.use("/order", require("./Routes/orderHistoryRouter"));

app.listen(PORT, () => {
  console.log("Backend Running on port " + PORT);
});
