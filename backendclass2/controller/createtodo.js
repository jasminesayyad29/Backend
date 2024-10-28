// first import the schema 
const Todo = require("../models/todo");

// define route handler
exports.createTodo = async(req,res) =>{
    try{
        //extract data from request body
        const {title,description} = req.body;
        
        //create new object and insert it in DB
        const response = await Todo.create({title,description});

        ////send a success message
        res.status(200).json({
            success:true,
            data: response,
            message:"Entry created successfully!",
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server error",
            message:err.message,
        });
    }
}