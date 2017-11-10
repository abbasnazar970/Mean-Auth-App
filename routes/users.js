const express=require("express");
const router=express.Router();
const passport=require("passport");
const jwt=require("jsonwebtoken");
const User=require("../models/users");
const config=require("../config/db");

router.post("/register",(req,res,next)=>{

    let newUser= new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });

    User.addUser(newUser,(err,user)=>{
            if(err){
                res.json({sucess:false,msg:'failed to register user'});
            }else
            {
                res.json({sucess:true,msg:'user registered'});
            }
    });
});

router.post("/authenticate",(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({sucess:false,msg:"user not found"});
        }

        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:604800
                });

                res.json({
                    rucess : true,
                    token :'bearer '+token,
                    user :{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            }
            else
            {
               return res.json({sucess:false ,msg :"Wrong password"});
            }
        });
    });
});

router.get("/profile",passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});



module.exports=router;