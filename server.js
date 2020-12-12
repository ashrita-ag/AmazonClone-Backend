require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use(cors());

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to Database");
  }
);

app.use("/user", require("./Routes/userRouter"));

const PORT = process.env.BPORT || 5000;
app.listen(PORT, () => {
  console.log("Backend Running on port " + PORT);
});
