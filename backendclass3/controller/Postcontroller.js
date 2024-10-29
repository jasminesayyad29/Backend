const Post = require("../models/postmodel");

exports.createPost = async(req,res) =>{
    try{
            const {title,body} = req.body;

            const postobj = new Post({title,body});
            const savedPost = await postobj.save();

            res.json({
                post:savedPost
            });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"post creation failed",
            error:"error occured"
        });
    }
}

exports.getPost = async(req,res) => {
    try{
        const allpost = await Post.find().populate("like").populate("comments").exec();
        res.json({
            success:true,
            data:allpost
        });
    }
    catch(error){
        res.json({
            success:false,
            error:error.message
        })
    }
}