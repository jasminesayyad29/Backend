//instantiate express
const express = require("express");
const app = express();

//import dotenv to load .env data into process
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//for parsing
app.use(express.json());

//connecting server to DB
require("./config/database").dbConnect();

//import routes and mount
const user = require("./routes/user");
app.use("/api/v1",user);

//start server
app.listen(PORT,() =>{
    console.log(`Server is UP and is running on port ${PORT}`);
});

app.get("/",(req,res) =>{
    res.send(`<h1>WELCOME BRO!</h1>`);
})