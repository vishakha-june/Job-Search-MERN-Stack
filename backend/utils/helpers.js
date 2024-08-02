const jwt= require("jsonwebtoken");

exports={};

exports.getToken=(email,user)=>{
    const token =jwt.sign({identifier: user.id},"unknownSecret");

    return token;
};

module.exports = exports;