const express= require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const {getToken}= require("../utils/helpers");


router.post("/register", async (req,res)=>{
    // this is the function that will handle register logic
    //step1: get the function that handle register user logic

    console.log(req.body);
    const{firstName, lastName, email, password}= req.body;
    return;
    if(!firstName || !email || !password){
        return res.status(400).json({err:"Invalid request body"});

    }

    //step2: check if user with email already exists which is not allowed
    const existingUser= await User.findOne({email:email});
    if(existingUser){
        return res
            .status(402)
            .json({err:"A user with this email already exists"});
    }

    //step 3 : if not then we create the user request lagitimate
    //if we set the password abc@123
    //we perform "encryption" on it to make it safe
    //abc@123 --> sfrgsrfs@43454
    //we can't decipher plain text from encrypted version& if the encryption matches the one in our db means the passwordis correct
    // this "encryption" is a special property called "hashing" by using "bcrypt" library
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserDetails = {
        firstName, 
        lastName,
        email,
        password,
        hashedPassword
    };
    const newUser = await User.create(newUserDetails);
    //step4: use the newUser to create JWT and return the token
    const token= await getToken(email,newUser);
    //we wnat to return the actual user and its token not the password for safety purposes
    const userToReturn={...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post("/login",async (req,res)=>{
    const {email,password}= res.body;
    if(!email || password){
        return res.status(401).json({err:"Invalid username or password"});
    }
    const user =await User.findOne({email:email});
    if(!user){
        return res.status(401).json({err:"Invalid username or password"});
    }

    const isPasswordValid= await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({err:"Invalid username or password"});

    }


    const token= await getToken(email,user);
    const userToReturn={...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports=router;