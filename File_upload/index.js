//creating app
const express = require("express");
const app = express();


//finding port
require("dotenv").config();
const PORT = process.env.PORT || 3000;


//adding middleware
const fileupload = require("express-fileupload");
app.use(fileupload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));
app.use(express.json());




//connecting to DB
const db = require('./config/database');
db.connect();


//connecting to cloud
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


//mounting api routes
const Upload = require('./routes/FileUpload');
app.use('/api/v1/uploads',Upload);


//activating server
app.listen(PORT, () =>{
    console.log(`App is listening at port ${PORT}`);
})

