require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.url(process.env.CLOUDINARY_URL);


const uploadToCloud = async (path) => {
	return await cloudinary.v2.uploader.upload(path);
};

module.exports = uploadToCloud;
