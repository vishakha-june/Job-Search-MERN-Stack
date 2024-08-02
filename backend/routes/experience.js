const express = require ("express");
const passport =require("passport");
const Experience = require("../models/Experience");

const router = express.Router();


router.post("/create", passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const user= req.user;

    const {companyName, position, startDate, endDate, description}= req.body;
    if(!companyName || position){
        return res.status(402).json({err:"Invalid details"});
    }
    const experienceObj= {
        companyName,
        position,
        startDate,
        endDate,
        description
    };
    const experience = await Experience.create(experienceObj);

    user.experiences.push(experience._id);
    await user.save();

    return res.status(200).json(experience);

});

module.exports=router;