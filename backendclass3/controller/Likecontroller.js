const Like = require("../models/likemodel");
const Post = require("../models/postmodel");

exports.likePost = async(req,res) =>{
    try{
        //extract data from request body
            const {post,user} = req.body;

        //create new object of like
            const liked = new Like({post,user});
        //insert into the db
            const likedPost = await liked.save();

        //update the array of like in the post with given id
            const postupdate = await Post.findByIdAndUpdate(
                post,
                {$push: {like: likedPost._id}},   //inserts the like in the fetched post 
                {new: true}             // Return the updated document
            )
            .populate("like")   //by populating u can actually view like but if not only id is visible
            .exec();

            res.json({
                post:likedPost
            });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"can't react to post",
            error:error.message
        });
    }
}


//when u unlike a post u will delete it from like and from post's like array
exports.unlikepost = async (req,res) => {
    try{
        const {like,post} = req.body;

        //find and delete the like
        const unliked = await Like.findOneAndDelete({post:post,_id:like});

        //update the post
        const updatepost = await Post.findByIdAndUpdate(
            post, 
            {$pull: {like: unliked._id}},
            {new:true}
        )
        .populate("like")
        .exec();

        res.json({
            post:updatepost
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"can't react to post",
            error:error.message
        });
    }
}