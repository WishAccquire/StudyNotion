const cloudinary = require("cloudinary").v2

exports.UploadImageToCloudinary = async (file, folder, height, quality) => {
 
  
 

  const options = {
    folder 
  };
  

  if (height) options.height = height;
  if (quality) options.quality = quality;
   options.resource_type="auto";
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Cloudinary Upload Result:", result);

    

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return { error: true, message: error.message };
  }
}
