const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//for parsing the data
app.use(express.json());

// //import routes
const blogroutes =  require("./routes/blog");

//mount blog api routes
app.use("/api/v1",blogroutes);

//start server
app.listen(process.env.PORT, () =>{
    console.log("server started successfully.");
})

//connection DB
const dbConnect = require("./config/database");
dbConnect();

//default route 
app.get("/",(req,res) =>{
    res.send(`<h1>This is HomePage Baby😘</h1>`);
})

