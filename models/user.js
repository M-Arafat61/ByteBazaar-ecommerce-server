const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    // wishlist:[{type:ObjectId, ref:'Product'}]
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
