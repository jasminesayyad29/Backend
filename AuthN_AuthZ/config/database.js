const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() =>{
        console.log("Connected to DATABASE successfully!");
    })
    .catch((err) =>{
        console.log(err);
        console.log("DB connection Issues");
        process.exit(1);
    });
}

