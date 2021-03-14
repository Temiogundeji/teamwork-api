import dotenv from 'dotenv';
dotenv.config();

import cloudinary  from 'cloudinary';
const uploader = cloudinary.v2.uploader;

const cloudinaryConfig = (req, res, next) => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    next();
}

export { cloudinaryConfig, uploader };