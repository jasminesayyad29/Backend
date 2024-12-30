const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then( console.log("Database Connected Successfully!"))
    .catch( (error) =>{
        console.log("DB connection issues");
        console.error(error);
        process.exit(1);
    });
};