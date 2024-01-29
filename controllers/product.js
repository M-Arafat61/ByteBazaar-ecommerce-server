const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log("inside product create controller", req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.list = async (req, res) => {
  res.json(await Product.find({}));
};
