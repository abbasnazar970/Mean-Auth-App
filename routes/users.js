const express=require("express");
const router=express.Router();
const passport=require("passport");
const jwt=require("jsonwebtoken");
const User=require("../models/users");


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

router.get("/authenticate",(req,res,next)=>{
    res.send("authenticate");
});

router.get("/profile",(req,res,next)=>{
    res.send("profile");
});



module.exports=router;