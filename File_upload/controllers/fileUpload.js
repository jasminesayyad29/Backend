const File = require('../models/File');
const cloudinary = require("cloudinary").v2;

//local file upload handler where u will fetch the file from request body and then will store on a certain path
exports.localFileUpload = async(req , res) =>{
    console.log("yess hits!")
    try{
        //fetch the file
        
        const file = req.files.file;
        console.log("File fetched", file);

        //define path and also findout the file extension to store the file in correct format
        let path = __dirname +"/uploads/"+ Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path to upload file on:", path);

        //move file
        file.mv(path, (error) =>{
            console.log(error);
        });

        res.json({
            success : true,
            message :'local file upload done!! '
        });

    }
    catch(error){
        console.log(error);
    }
}

//  function to upload on cloudinary
async function uploadFileToCloudinary(file, folder , quality) {
    const option = {folder};            //folder on the cloudinary where u want to upload
    console.log("temp file path" , file.tempFilePath);
    option.resource_type = "auto";

    if(quality){
        option.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, option);     //file.tempFilePath: The path to the file on the server's temporary storage.
}

//image upload handler
function isFileTypeSupported(supportedType, fileType){
    return supportedType.includes(fileType);
}
exports.imageUpload = async(req,res) =>{
    try{
        //fetch data form req body
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        const supportedType = ["jpg" , "jpeg", "png", "svg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(supportedType, fileType))
        {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        //file type is supported
        const response = await uploadFileToCloudinary(file, "fileupload");

        console.log(response);

        //DB me entry store krni hai
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

//video upload ka handler

// function isExceedsFileSize(file){
//     return file.size <= 5242880;
// }

exports.videoUpload = async(req, res) =>{
    try{
        //fetch data
        const { name,email, tags} = req.body;
        console.log(name , email, tags);

        //fetch the video file
        const file = req.files.videoFile;
        console.log(file);

        const supportedType = ["mp4" , "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(supportedType, fileType) )
        {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        //file type is supported
        console.log("Uploading a video on cloudinary");
        const response = await uploadFileToCloudinary(file, "fileupload");
        console.log(response);

        //DB me entry store krni hai
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'Video uploaded successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

//image reducer handler to reduce the size of image and then upload

exports.imageSizeReducer = async(req,res) =>{
    try{
        //fetch data
        const {name, email, tags } = req.body;
        console.log( name , email, tags);

        //fetch image file
        const file = req.files.imageFile;
        console.log(file);

        const supportedType = ["jpg" , "jpeg", "png", "svg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(supportedType, fileType))
        {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        //file type is supported
        const response = await uploadFileToCloudinary(file, "fileupload" , 80);
        console.log(response);

        //DB me entry store krni hai
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}