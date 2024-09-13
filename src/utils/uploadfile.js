import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})


// cloudinary.config({ 
//   cloud_name: 'dvkzgjgci', 
//   api_key:'393141633392456', 
//   api_secret: 'JgmEpTPWKb_mGDMBLJ3iKsVIVwc'
// });'
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath)
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response);
        fs.unlinkSync(localFilePath)
        return response;    

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log("massege :",  error , error.url);
        
        return null;
    }
}


export {uploadOnCloudinary}