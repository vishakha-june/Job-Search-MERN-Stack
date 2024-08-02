const mongoose = require("mongoose");

//1.create schemas
//2.convert schema to a model

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: false, // not mandatory for login
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        required: true,
    },
    // make json array
    experiences:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Experience",
        },
    ],
    projects:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        },
    ],
    skills:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Skills",
        },
    ],


});
// convert schema to model
const User = mongoose.model("User", UserSchema);
module.exports= User;
