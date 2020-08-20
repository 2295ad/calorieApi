var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const { ErrorHandler } = require('../error')

//get config details
dotenv.config();

router.use((req,res,next)=>{
    var token = req.headers['authorization'];
    if(token)
    {
        jwt.verify(token, process.env.SECRET_TOKEN,{algorithms:process.env.ALGORITHM},function(err, decoded){
            if(err){
                throw new ErrorHandler('Invalid Token')
            }else{
                req.decoded = decoded;
                next()
            }
        })
    }else{
        throw new ErrorHandler('Token missing')
    }
})

module.exports = router;