const bcrypt = require("bcrypt"); //for password hashing
const jwt = require("jsonwebtoken");
const userScehma = require("../models/User");
require("dotenv").config();

//signup handler
exports.signup = async(req,res) =>{
    try{
        //get all the data from request body 
        const { name, email, password, role} = req.body;

        //check user already exist
        const existinguser = await userScehma.findOne({email});
        if( existinguser){
            return res.status(400).json({
                success:false,
                message:"User Already exits"
            });
        }

        //secure the password
        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Failed to hash password"
            });
        }

        //create user and insert in db
        const user = await userScehma.create({name, email, password:hashedpassword, role});

        res.status(200).json({
            success:true,
            message: "User registered Successfully!!"
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            error: error,
            message:"Registration failed.. Try again later"
        })
    }
}



exports.login = async(req,res) =>{
    try{
        const {email , password } = req.body;
        //all fields are filled or not
        if( !email || !password )
        {
            return res.json({
                success:false,
                message:"Please fill all the fields!"
            })
        }

        //checking user is registered or not
        let user = await userScehma.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User doesn't exists"
            })
        }

        //verify password & generate JWT token
        const payload = {
            email: user.email,
            role: user.role,
            id: user._id
        };

        //check if the password matches with the hashed password using compare func in bcrypt
        if( await bcrypt.compare(password, user.password))
        {
                //create jwt token
            let token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: "3h"});

            user = user.toObject();
            user.token = token;     //adding the token in our user object
            user.password = undefined   // to protect the password removed it from user object, password will be there in DB

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            };
            res.cookie("token" , token, options ).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully!"
            });
        }

        else{
                //password doesn't match
                return res.status(403).json({
                    success:false,
                    message:"Incorrect Passowrd .."
                });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot Login to this account",
        })
    }
}