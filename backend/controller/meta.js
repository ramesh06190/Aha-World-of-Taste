const cloudinary = require("cloudinary").v2;
const config = require("../config");

// cloudinary configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// upload image or document
const imageUpload = async (req, res, next) => {
  console.log("hiihihih");
  try {
    const file = req.files.image;
    console.log(file);
    if (!file) {
      res.json({ message: "Please add image", status: false });
    } else {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
      });
      res.json({
        message: "Normal and secure url",
        secureUrl: result.secure_url,
        url: result.url,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: "Please add image", status: false });
  }
};

module.exports = { imageUpload };
