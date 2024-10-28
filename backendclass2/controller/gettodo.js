// first import the schema 
const Todo = require("../models/todo");

//define route handler
exports.getTodo = async(req,res) =>{
    try{
        //fetch all data from db
        const todos = await Todo.find({}); 

        //response
        res.status(200).json({
            success:true,
            data:todos,
            message:"Data fetched successfully🎉"
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Internal Error",
        })
    }
}

//controller just to get the single data based on ID

exports.getTodobyId = async(req,res) =>{
    try{
        //fetch only required data from db
        const id = req.params.id;
        const todo = await Todo.findById(id); 

        //if data for given id is not present then
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "data not found"
            })
        }

        //response  if found
        res.status(200).json({
            success:true,
            data:todo,
            message:"Data fetched successfully🎉"
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Internal Error",
        })
    }
}