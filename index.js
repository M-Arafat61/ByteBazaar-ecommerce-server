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
app.use(express.json({ extended: true, limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// db connection
mongoose
  .connect(process.env.DB_URI, {
    dbName: "ByteBazaar",
  })
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
