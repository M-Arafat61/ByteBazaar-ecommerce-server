const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

exports.upload = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    if (result) {
      res.json({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.remove = (req, res) => {
  const image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, err => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.send({ message: "Image deleted successfully!" });
  });
};
