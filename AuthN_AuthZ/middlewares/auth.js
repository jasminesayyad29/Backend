//three middlewares one for autherization, one for Admin and one for visitor
//auth , isAdmin, isVisitor

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res, next ) =>{
    try{
        //fetch the token first to find out the role of user
        const token = req.body.token ;

        if(!token){
            res.status(401).json({
                success:false,
                message:"Missing Token."
            });
        };

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid Token."
            });
        }

        //now goto next middleware
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something wrong with token.."
        });
    }
}

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role !== "Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This is Protected route for Admin U can't access this"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong cannot verify role."
        });
    }
}


exports.isVisitor = (req,res,next) =>{
    try{
        if(req.user.role !== "Visitor")
            {
                return res.status(401).json({
                    success:false,
                    message:"This is Protected route for Visitor U can't access this"
                })
            }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong cannot verify role."
        }); 
    }
}