const  cloudinary  = require("cloudinary").v2
const fs = require("fs")



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return {success: false, message:"Please upload the Image"}
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        }) 
        fs.unlinkSync(localFilePath)
        return response     
    } catch (error) {
        console.log("cloudinary upload error:",error)
        fs.unlinkSync(localFilePath)
        return {success: false, message:"Failed to upload the image"}
    }
}

module.exports =  { uploadOnCloudinary }