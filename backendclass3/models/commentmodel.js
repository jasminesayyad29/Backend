
//import mongoose
const mongoose = require("mongoose");

//route handler
const CommentSchema = new mongoose.Schema(
    {
        //on which post user commented post is another model in itself so just pass its reference not entire object
        post:{
            type: mongoose.Schema.Types.ObjectId,   //when u want to refer another model inside one model u can use its ID  
            ref: "post",  //reference Id
        },
        user:{
            type: String,
            required: true,
        },
        body:{
            type:String,
            required: true,
        }
    }
);

module.exports = mongoose.model("Comment",CommentSchema);