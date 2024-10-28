const Todo = require("../models/todo");

exports.deleteTodo = async(req,res) =>{
    try{
        //extract id request body
        const {id} = req.params;

        await Todo.findByIdAndDelete(id);

        ////send a success message
        res.status(200).json({
            success:true,
            message:"deleted successfully!",
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