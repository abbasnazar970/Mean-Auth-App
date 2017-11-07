const express =require("express");
const path= require("path");
const bodyParser = require("body-parser");
const  cors = require("cors");
const passport = require("passport");
const  mongoose= require("mongoose");
const config=require('./config/db');
const  app= express();

const user= require("./routes/users");

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log("connected to database"+config.database);
});

mongoose.connection.on('error',(err)=> {
    console.log("connected error: "+err);
});

const port=3000;

app.use(cors());

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.json());

app.use('/users',user);

app.get('/',(req,res) => {
    res.send("invalid endpoint");
});

app.listen(port,()=>{
    console.log("server started at 3000");
});