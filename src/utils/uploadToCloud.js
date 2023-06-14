require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name:process.env.CLOUD_NAME,
	api_key:process.env.API_KEY,
	api_secret:process.env.API_SECRET
})
// cloudinary.url(process.env.CLOUDINARY_URL);


const uploadToCloud = (path, opt) => {
	return cloudinary.uploader.upload(path,opt);
};

module.exports = uploadToCloud;
