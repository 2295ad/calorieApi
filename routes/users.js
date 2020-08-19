const express = require('express');
const route = express.Router();
const configDetails = require('../config.json')
const db = require('monk')(configDetails.user + ':' + configDetails.passwd + '@' + configDetails.url + configDetails.db)

route.post('/register',async(req,res,next)=>{
    try{
        let body = {
            userId:req.body.user,
            email:req.body.email,
            passwordHash:req.body.hash,
            ts:new Date().getTime()
        }
        let collcn = await db.get('user')
        await  collcn.insert(body)
        let obj =  { ...res.locals}
        res.send(obj)
    }catch(e){
        next(e)
    }
})

route.get('/login', async(req,res,next)=>{
    try{
        let body = {
            userId : req.body.user,
            hash:req.body.hash
        }
        let collcn = await db.get('user')
        let resp = await collcn.findOne({name:body.userId, passwordHash:body.hash})
        if(resp!=null){
            let obj ={ ...res.locals, signIn:true}
            res.send(obj)
        }else{
            let obj = {...res.locals, signIn:false}
            res.send(obj)
        }

    }catch(e){
        next(e)
    }
})

module.exports=route




