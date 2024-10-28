const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,      // Enables the new, more flexible connection string parser
        useUnifiedTopology: true    //Uses a unified connection management engine for more stable and efficient connections.
    })
    .then( () => {
        console.log("Database connected successfully");
    })
    .catch((error) =>{
        console.log(`Connection Failed!! error ${error}`);
        process.exit(1); // Exit the process with a failure code
    })
}

module.exports = dbConnect;