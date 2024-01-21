const Category = require("../models/category");
const slugify = require("slugify");

// post category
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (error) {
    // console.log(error);
    res.status(400).send("Create category failed!");
  }
};

// getting all categories data
exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

// get specific category data
exports.read = async (req, res) => {
  res.json(await Category.findOne({ slug: req.params.slug }).exec());
};

// updating a category as new
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Category update failed!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedCategory);
  } catch (error) {
    res.status(400).send("Failed to delete category");
  }
};
