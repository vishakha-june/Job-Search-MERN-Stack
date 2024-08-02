const express = require("express");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStretegy=require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
const skillRoutes=require("./routes/skill");
const projectRoutes= require("./routes/project");
const User = require("./models/User");

require("dotenv").config();

 const app =express();
 app.use(express.json());

//to connect mongo db use mongodb.connect()
//it require 2 arguments 1. connection string(key) 2. connection option
mongoose.connect(
    "mongodb+srv://vishakhadubey004:" + 
        process.env.MONGO_PASSWORD +
         "@cluster0.cysb6fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
).then((x)=>{
    console.log("Connected to mongo!");
}).catch((err)=>{
    console.log("Error occured while connecting to mongo!");
    console.log(err);
});

 //passport-jwt setup= extracting login properties
 
 let opts={}
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
 opts.secretOrKey= "unknownSecret";
 passport.use(
    new JwtStretegy(opts, async function(jwt_payload, done){
        try{
            const user= await User.findOne({_id: jwt_payload.identifier});
                
            if(user){
                done(null, user);
            }
            else {
                done(null, false);
            }
        }catch(err){
            if(err){
                done(err,false);
            }
        }
        
    })
 );

 app.get("/", (req, res)=>{
    res.send("I am working");

 });

 app.get("/hello",(req,res)=> {
    res.send("this is a new route");
 });

 app.use("/auth", authRoutes);
 app.use("/experience",experienceRoutes);
 app.use("/skill", skillRoutes);
 app.use("/project", projectRoutes);
 

 app.listen(8000, ()=>{
    console.log("Server running on port 8000");
 });