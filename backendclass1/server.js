//mongoose is used to connect the express server and MongoDB. It is ODM(Object Document Mapper)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log("Database connected successfully!");
})
.catch((error) =>{
    console.log(`Connection Failed with error ${error}`);
});

// instantiate server
const express = require('express');  
const app = express(); 

//activating the server on port 3000
app.listen(3000,() =>{
    console.log("Server is Started at port 3000");
});

//used to parse req.body in express (specially used in case of PUT / POST )
const bodyparser = require('body-parser');
//specifically parse json data & add it to request body
app.use(bodyparser.json());

//Routes ( get => retrieving data from the server 
//         post => giving the data on server )
app.get('/', (req,res) => {
    res.send("Hello World!");
});

app.post('/api/cars',(req,res) => {
    const {name,brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Your Car details recorded successfully.");
});