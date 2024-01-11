const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// for routes dir looping
const { readdirSync } = require("fs");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// db connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("byteBazaar connected"))
  .catch(err => console.log("DB Connection error", err));

// routes middleware
readdirSync("./routes").map(r => app.use("/", require("./routes/" + r)));

app.get("/", (req, res) => {
  res.json({
    data: "ByteBazaar server hits!",
  });
});

app.listen(port, () => {
  console.log(`byteBazaar is running on port ${port}`);
});