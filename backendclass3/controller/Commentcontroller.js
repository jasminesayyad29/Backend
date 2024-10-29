//import required models
const Comment = require("../models/commentmodel");
const Post = require("../models/postmodel");

//business logic
exports.createComment = async (req,res) =>{
    try {
        //extract data from request body
        const {user,post,body} = req.body;

        //const response = await Comment.create({user,post,body});
            //*****another way to add object in the database******//
        const comment = new Comment({user,post,body});
        const response = await comment.save();

        //u need to add the comment on the corresponding post
        //find the post by id and then insert it in that post's comment
        const postupdate = await Post.findByIdAndUpdate(
            post,
            {$push: {comments: response._id}},   //inserts the comment in the fetched post 
            {new: true}             // Return the updated document
        )
        .populate("comments")   //by populating u can actually view comments but if not only id is visible
        .exec();

        res.json({
            success:true,
            post:postupdate,
            message:"Comment Done!",
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server error",
            message:err.message,
        });
    }
}