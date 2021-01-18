require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

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

const URL = process.env.NODE_ENV == "development" ? "/api/" : "/";

app.use(`${URL}user`, require("./Routes/userRouter"));
app.use(`${URL}product`, require("./Routes/productRouter"));
app.use(`${URL}user/cart`, require("./Routes/cartRouter"));
app.use(`${URL}address`, require("./Routes/addressRouter"));
app.use(`${URL}delivery`, require("./Routes/deliveryRouter"));
app.use(`${URL}checkout`, require("./Routes/checkoutRouter"));
app.use(`${URL}order`, require("./Routes/orderHistoryRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend Running on port " + PORT);
});
