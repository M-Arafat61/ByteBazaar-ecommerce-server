const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const uploadOnCloudinary = async localFilePath => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    // remove locally saved temporary file
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// module.exports = uploadOnCloudinary;
export { uploadOnCloudinary };
