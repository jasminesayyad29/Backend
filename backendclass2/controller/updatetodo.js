const Todo = require("../models/todo");

exports.updateTodo = async(req,res) =>{
    try{
        //extract id request body
        const {id} = req.params;
        const {title,description} = req.body;

        //create new object and insert it in DB
        const todo = await Todo.findByIdAndUpdate(
            id,
            {title,description,updatedOn: Date.now()},
            { new: true } // Return the updated document
        );

        ////send a success message
        res.status(200).json({
            success:true,
            data: todo,
            message:"updated successfully!",
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