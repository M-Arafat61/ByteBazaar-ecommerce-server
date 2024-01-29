const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    // images: {
    // //   type: Array,
    // // },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: [
        "Silver",
        "Space Gray",
        "Black",
        "White",
        "Blue",
        "Red",
        "Gold",
        "Rose Gold",
        "Carbon Black",
        "Gunmetal",
      ],
    },
    brand: {
      type: String,
      enum: [
        "Xiaomi",
        "Acer",
        "Dell",
        "MSI",
        "Microsoft",
        "Razer",
        "Samsung",
        "Apple",
        "HP",
        "Lenovo",
      ],
    },
    //   ratings:[{
    //     star:Number,
    //     postedBy:{type:ObjectId, ref:'User'}
    //   }]
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);
module.exports = product;
