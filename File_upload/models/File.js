const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    imageUrl:{
        type: String
    },
    tags:{
        type: String
    },
    email:{
        type: String
    }
});


//post middleware to send mail after the entry is created in DB
fileSchema.post( 'save' , async function(doc) {
    try{
        console.log("doc", doc);

        //creating transporter using nodemailer
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: `Jasmine`,
            to: doc.email,
            subject: `New file uploaded on cloudinary`,
            html: `<h2>Hello Ji</h2> <p>File Uploaded Successfully View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });

        console.log("Info", info);
    }
    catch(error){
        console.log(error);
    }
});

module.exports = mongoose.model("File",fileSchema);