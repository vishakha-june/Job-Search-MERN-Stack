const express = require("express");
const passport = require("passport");
const Project = require("../models/Project");

const router = express.Router();

router.post(
    "/create",
    passport.authenticate("jwt",{session:false}),
    async (req,res)=>{
        const user=req.user;

        const {name, description, links}= req.body;
        if(!name){
            return res.status(402).json({err:"Invalid details"})
        }

        const projectObj= {name, description, links};
        const project =await Project.create(projectObj);

        user.projects.push(project._id);
        await user.save();

        return res.status(200).json(project);

});


module.exports = router;