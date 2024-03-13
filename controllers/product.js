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

exports.allList = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    return res.status(400).send("Product delete failed!");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const existingProduct = await Product.findOne({ slug: req.params.slug });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedImages = req.body.images || [];
    const existingImages = existingProduct.images || [];
    const deletedImages = existingImages.filter(
      image => !updatedImages.includes(image)
    );

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      {
        ...req.body,
        images: updatedImages.filter(image => !deletedImages.includes(image)),
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.newAndBestList = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    console.log(req.body);
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
