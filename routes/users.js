const express = require('express');
const route = express.Router();
const configDetails = require('../config.json')
const db = require('monk')(configDetails.url + configDetails.db)
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { ErrorHandler } = require('../error')

//get config details
dotenv.config();

route.post('/register',async(req,res,next)=>{
    try{
        let body = {
            email:req.body.email,
            passwordHash:req.body.hash,
            ts:new Date().getTime()
        }
        let collcn = await db.get('user')
        let dupUser = await collcn.findOne({email:body.email})
        if(dupUser !== null){
            res.locals.msg = 'User already registered'
            res.locals.reg = false
        }else{
            await  collcn.insert(body)
            res.locals.msg = 'User registered'
            res.locals.reg  = true
        }
        let obj =  { ...res.locals}
        res.send(obj)
    }catch(e){
        throw new ErrorHandler(e)
    }
})


/**
 * @description - on successfull login generate jwt
 */
route.post('/login', async(req,res,next)=>{
    try{
        let body = {
            email : req.body.email,
            passwordHash:req.body.hash
        }
        let collcn = await db.get('user')
        let resp = await collcn.findOne({email:body.email, passwordHash:body.passwordHash})
        if(resp!=null){
            let token = jwt.sign(body, process.env.SECRET_TOKEN, {
                algorithm: process.env.ALGORITHM,
                expiresIn: '1d'
                });
            let obj ={ ...res.locals, signIn:true, token:token}
            res.send(obj)
        }else{
            res.locals.msg =" Authentication failed"
            let obj = {...res.locals, signIn:false}
            res.send(obj)
        }

    }catch(e){
        throw new ErrorHandler(e)
    }
})

module.exports=route




