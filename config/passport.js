const jwtstrategy = require('passport-jwt').Strategy;
const Exatractjwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users");
const config = require("../config/db");

module.exports= function (passport) {
    let opts={};
    opts.jwtFromRequest=Exatractjwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey=config.secret;



    var strategy=new jwtstrategy(opts,(jwt_payload,done)=>{
        console.log(jwt_payload);
    User.getUserID(jwt_payload._id,(err,user)=>{
        if(err){
            return done(err,false);
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
});
});

    passport.use(strategy);
}