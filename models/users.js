const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const config = require("../config/db");

//schema

    const UserSchema = mongoose.Schema({
       name:{
           type:String
       },
        email:
            {
                type:String,
                required:true
            },
        username:
            {
               type:String,
                required:true
            },
            password :{
            type: String,
                required:true
            }


    });

    const User= module.exports = mongoose.model("User",UserSchema);

    module.exports.getUserID=(id,callback)=>{
    User.findById(id,callback);
}

module.exports.getUserByUsername=(username,callback)=>{
        const query={username:username};
        User.findOne(query,callback);
}

module.exports.addUser = function (newUser, callback) {
    bycrypt.genSalt(10,(err,salt)=>{
        bycrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
    });
    });
}

module.exports.comparePassword=function (password,hash,callback) {
    bycrypt.compare(password,hash,(err,isMatch)=>{
            if(err) throw err;
            callback(null,isMatch);
    });
}

