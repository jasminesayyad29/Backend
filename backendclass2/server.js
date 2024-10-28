const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000; 

//used for parsing instead of using bodyParser
app.use(express.json());

//import routes for todo api
const todoroutes =  require("./routes/todo");

//mount todo api routes
app.use("/api/v1",todoroutes);

//start server
app.listen(process.env.PORT, () =>{
    console.log("server started successfully.");
})

//connection DB
const dbConnect = require("./config/database");
dbConnect();

//default route 
app.get("/",(req,res) =>{
    res.send(`<h1>This is MY home page Baby😘</h1>`);
})
