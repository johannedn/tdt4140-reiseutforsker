const express = require("express");
const jwt = require("jsonwebtoken");


const jwtSigningSecret = "sfdjfiudfghjklkuytresx";

const AuthMiddleware = express.Router();

const autenticated = (token)=>{

    try {
        return jwt.verify(token, jwtSigningSecret)
    } catch (error) {
        return false
    }
};
AuthMiddleware.post("/auth",async (req, res)=>{
    const auth = autenticated(req.headers.authorization)
    console.log(req.headers.authorization)
    if(auth){
        return res.json({auth:true})
    }
    res.json({auth:false})
})

AuthMiddleware.use((req, res, next)=>{

    if (autenticated(req.headers.authorization)) {
        next();
        return;
    } 
    res.status(401).json({error: "unAutorized"})
})

module.exports = {AuthMiddleware};
